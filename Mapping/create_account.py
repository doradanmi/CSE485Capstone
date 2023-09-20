import boto3
import hashlib
import os


def handler(event: any, context: any):
    # Retrieve user details from the request payload
    user = event['user']
    password = event['password']
    first_name = event['first_name']
    last_name = event['last_name']
    email = event['email']
    role = event['role']

    # hash all the values
    hashed_user = hashlib.sha256(user.encode('utf-8')).hexdigest()
    hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
    hashed_fname = hashlib.sha256(first_name.encode('utf-8')).hexdigest()
    hashed_lname = hashlib.sha256(last_name.encode('utf-8')).hexdigest()
    hashed_email = hashlib.sha256(email.encode('utf-8')).hexdigest()
    hashed_role = hashlib.sha256(role.encode('utf-8')).hexdigest()

    # connect to dynamodb
    dynamodb = boto3.resource('dynamodb')
    table_name = os.environ['TABLE_NAME']
    table = dynamodb.Table(table_name)

    # check the table
    response = table.get_item(Key={'user': hashed_user})
    # print(response)
    if "Item" not in response:
        table.put_item(Item={
            'user': hashed_user,
            'password': hashed_password,
            'first_name': hashed_fname,
            'second_name': hashed_lname,
            'email': hashed_email,
            'role': hashed_role
        })
        return {
            'statusCode': 302,
            'body': f'User account created successfully!'
        }
    else:
        return {
            'statusCode': 401,
            'body': f'User account already exists please login instead'
        }
