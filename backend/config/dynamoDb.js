import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});

export const ddbDocClient = DynamoDBDocumentClient.from(client);
