import boto3
import os


def handler(event: any, context: any):
    # connect to table
    dynamodb = boto3.resource('dynamodb')
    table_name = os.environ['TABLE_NAME']

    response = dynamodb.scan(TableName=table_name)

    return {
        'statusCode': 200,
        'body': response
    }