import os
import json
import boto3
import socket
import requests
import dns.resolver
from dns.exception import DNSException

NAMESERVERS = json.loads(os.environ["NAMESERVERS"])
DOMAIN = os.environ["DOMAIN"]
SCHEDULER_NAME = os.environ["SCHEDULER_NAME"]
GROUP_NAME = os.environ["GROUP_NAME"]

ssm_client = boto3.client("ssm")

def get_url_param():
    response = ssm_client.get_parameter(Name="SLACK_BOT_SECRETS")
    value = response["Parameter"]["Value"]
    if not value:
        raise RuntimeError("Cannot find parameters.")
    return json.loads(value)

def lambda_handler(event, context):
    secrets = get_url_param()
    token = secrets["token"]
    channel_id = secrets["channel_id"]
    
    propagated = True
    for ns in NAMESERVERS:
        try:
            ns_ip = socket.gethostbyname(ns)
            resolver = dns.resolver.Resolver()
            resolver.nameservers = [ns_ip]
            resolver.resolve(DOMAIN, "NS")
        except (DNSException, socket.gaierror):
            propagated = False
            break

    if propagated:
        message = f"Nameservers have propagated for {DOMAIN}."
        response = requests.post(
            "https://slack.com/api/chat.postMessage",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            },
            json={
                "channel": channel_id,
                "text": message
            }
        )

        result = response.json()
        if not result.get("ok"):
            raise RuntimeError(f"Slack API error: {result.get('error')}")
       
        existing = scheduler_client.get_schedule(Name=SCHEDULER_NAME, GroupName=GROUP_NAME)
        scheduler_client.update_schedule(
            Name=SCHEDULER_NAME,
            GroupName=GROUP_NAME,
            State="DISABLED",
            ScheduleExpression=existing["ScheduleExpression"],
            FlexibleTimeWindow=existing["FlexibleTimeWindow"],
            Target=existing["Target"],
        )
    
    return {
        "status_code": 200,
        "body": json.dumps({"propagated": propagated})
    }
