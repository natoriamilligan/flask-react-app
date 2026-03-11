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