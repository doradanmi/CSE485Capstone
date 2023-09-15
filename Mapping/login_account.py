import boto3
import hashlib
import os


def handler(event: any, context: any):
    # Retrieve user details from the request payload
    user = event['user']
    password = event['password']

    # hash all the values
    hashed_user = hashlib.sha256(user.encode('utf-8')).hexdigest()
    hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

    # connect to dynamodb
    dynamodb = boto3.resource('dynamodb')
    table_name = "UTMLogins" # os.environ['TABLE_NAME']
    table = dynamodb.Table(table_name)

    # check the table
    response = table.get_item(Key={'user': hashed_user})
    # print(response)
    item = response.get("Item")
    if item:
        if hashed_password == item.get("password"):
            return {
                'statusCode': 200,
                'body': f'User account found'
            }
        return {
            'statusCode': 401,
            'body': f'User account not verified'
        }
    else:
        return {
            'statusCode': 401,
            'body': f'User account not verified'
        }

