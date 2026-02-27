import os
import json
import boto3
import requests
import dns.resolver
from dns.exception import DNSException

BOT_SECRET_NAME = os.environ["SLACK_BOT_TOKEN_SECRET"]
NAMESERVERS = json.loads(os.environ["NAMESERVERS"])
DOMAIN = os.environ["DOMAIN"]
SCHEDULER_NAME = os.environ["SCHEDULER_NAME"]
CHANNEL_ID = os.environ["CHANNEL_ID"]

secrets_client = boto3.client("secretsmanager")
scheduler_client = boto3.client("scheduler")

def get_url_secret():
    response = secrets_client.get_secret_value(SecretId=BOT_SECRET_NAME)
    url_string = response.get("SecretString")
    if not url_string:
        raise RuntimeError("Cannot find SecretString key.")
    return json.loads(url_string)["slack-bot-token"]

def lambda_handler(event, context):
    token = get_url_secret()
    
    propagated = True
    for ns in NAMESERVERS:
        try:
            resolver = dns.resolver.Resolver()
            resolver.nameservers = [ns]
            resolver.resolve(DOMAIN, "NS")
        except DNSException:
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
                "channel": CHANNEL_ID,
                "text": message
            }
        )

        result = response.json()
        if not result.get("ok"):
            raise RuntimeError(f"Slack API error: {result.get('error')}")
       
        existing = scheduler_client.get_schedule(Name=SCHEDULER_NAME)
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