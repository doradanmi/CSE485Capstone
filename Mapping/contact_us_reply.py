import boto3
import os


def handler(event: any, context: any):
    # retrieve user details from the request payload
    full_name = event['full_name']
    contact_type = event['contact_type']

    # connect to table
    dynamodb = boto3.resource('dynamodb')
    table_name = os.environ['TABLE_NAME']
    table = dynamodb.Table(table_name)

    if contact_type == "email":

        # send email mark done in table
        table.put_item(Item={
            "full_name": full_name,
            "email": event['email'],
            "phone_number": event['phone_number'],
            "message": event['message'],
            "reply": event['reply'],
            "contact_type": contact_type,
            "done": "true"
        })
    elif contact_type == "phone":
        # send text message, mark done in table
        table.put_item(Item={
            "full_name": full_name,
            "email": event['email'],
            "phone_number": event['phone_number'],
            "message": event['message'],
            "reply": event['reply'],
            "contact_type": contact_type,
            "done": "true"
        })

    return {
        'statusCode': 200,
        'body': f'Your message has been sent!'
    }
