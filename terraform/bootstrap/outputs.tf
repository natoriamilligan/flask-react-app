output "nameservers" {
  value = aws_route53_zone.hosted_zone.name_servers
}

output "hosted_zone_id" {
  value = aws_route53_zone.hosted_zone.zone_id
}