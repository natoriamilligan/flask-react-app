# Reference output from bootstrap remote state
data "terraform_remote_state" "core-infra" {
  backend = "s3"
  config = {
    bucket = "nmilligan-tf-states"
    key    = "core-infra/terraform.tfstate"
    region = var.region
  }
}

# Task execution role data
data "aws_iam_policy_document" "migrations_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}