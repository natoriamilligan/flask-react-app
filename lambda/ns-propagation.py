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

secrets_client = boto3.client("secretsmanager")
scheduler_client = boto3.client("scheduler")

def get_url_secret():
    response = secrets_client.get_secret_value(SecretId="SLACK_BOT_SECRETS")
    url_string = response.get("SecretString")
    if not url_string:
        raise RuntimeError("Cannot find SecretString key.")
    return json.loads(url_string)

def lambda_handler(event, context):
    token = get_url_secret()["token"]
    channel_id = get_url_secret()["channel_id"]
    
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
            State="DISABLED",
            ScheduleExpression=existing["ScheduleExpression"],
            FlexibleTimeWindow=existing["FlexibleTimeWindow"],
            Target=existing["Target"],
        )
    
    return {
        "status_code": 200,
        "body": json.dumps({"propagated": propagated})
    }
