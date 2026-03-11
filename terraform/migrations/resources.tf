# Direct state file to S3 bucket
terraform {
  backend "s3" {
    bucket         = "nmilligan-tf-states"
    key            = "migrations/terraform.tfstate"
    region         = "us-east-1"
    use_lockfile   = true
    encrypt        = true
  }
}

# Create role for running migrations in EC2
resource "aws_iam_role" "migrations_role" {
  name               = "migrations-role"
  assume_role_policy = data.aws_iam_policy_document.migrations_assume_role_policy.json
}

# Create policy to allow EC2 instance to access the DB secret
resource "aws_iam_role_policy" "migrations_secrets_policy" {
  name = "accessSecretsManager"
  role = aws_iam_role.migrations_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
          Action = ["secretsmanager:GetSecretValue"]
          Effect   = "Allow"
          Resource = [data.terraform_remote_state.core-infra.outputs.db_secret]
      },
    ]
  })
}

# Create EC2 instance profile for IAM role
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "migrations-instance-profile"
  role = aws_iam_role.migrations_role.name
}

# Create EC2 security group
resource "aws_security_group" "ec2_sg" {
  name        = "ec2-sg"
  vpc_id      = aws_vpc.main.id
}

# Allow traffic from anywhere to EC2 instance
resource "aws_security_group_rule" "allow_ec2" {
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  security_group_id        = aws_security_group.ec2_sg.id
  cidr_blocks              = ["0.0.0.0/0"]
}

# Allow traffic from EC2 instance to anywhere (AWS API)
resource "aws_security_group_rule" "ec2_to_anywhere" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  security_group_id = aws_security_group.ec2_sg.id
  cidr_blocks       = ["0.0.0.0/0"]
}

# Create EC2 instance for migrations
resource "aws_instance" "migrations_instance" {
  ami                         = "ami-02dfbd4ff395f2a1b"
  instance_type               = "t3.micro"
  key_name                    = "db-migrations"
  subnet_id                   = aws_subnet.public_a.id
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.ec2_profile.name

  root_block_device {
    volume_size = 8
    volume_type = "gp3"
  }

  user_data = <<-EOF
              #!/bin/bash -xe

              sudo yum update -y
              sudo yum install -y git python3 python3-pip 

              git clone https://github.com/natoriamilligan/flask-react-app.git
              cd flask-react-app/backend

              python3 -m venv venv
              source venv/bin/activate

              pip install -r requirements.txt

              export DATABASE_URL="$(aws secretsmanager get-secret-value \
                --secret-id DATABASE_URL \
                --query SecretString \
                --output text)"
              EOF

  depends_on = [aws_iam_instance_profile.ec2_profile.name, aws_security_group.ec2_sg.id]
}
