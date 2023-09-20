import boto3
import os


def handler(event: any, context: any):
    # Retrieve user details from the request payload
    full_name = event['full_name']
    email = event['email']
    phone_number = event['phone_number']
    message = event['message']

    # connect to table
    dynamodb = boto3.resource('dynamodb')
    table_name = os.environ['TABLE_NAME']
    table = dynamodb.Table(table_name)

    # add message to table
    table.put_item(Item={
        "full_name": full_name,
        "email": email,
        "phone_number": phone_number,
        "message": message,
        "contact_type": "none",
        "done": "false"
    })

    return {
        'statusCode': 200,
        'body': f'Your message has been sent!'
    }
