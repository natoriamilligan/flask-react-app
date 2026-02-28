output "nameservers" {
  value = aws_route53_zone.hosted_zone.name_servers
}
