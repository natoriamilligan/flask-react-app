output "db_secret" {
  value = aws_secretsmanager_secret.db_secret.arn
}

output "vpc" {
  value = aws_vpc.main.id
}

output "public_subnet" {
  value = aws_subnet.public_a.id
}