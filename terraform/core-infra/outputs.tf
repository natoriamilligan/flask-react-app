output "vpc" {
  value = aws_vpc.main.id
}

output "public_subnet" {
  value = aws_subnet.public_a.id
}

output "db_sg_id" {
  value = aws_security_group.db_sg.id
}
