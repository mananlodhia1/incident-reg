import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import crypto from "crypto";

// Initialize the Cognito client
const awsConfig = () => {
  const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: fromEnv(),
  });
  return client;
};

const generateSecretHash = (username) => {
  const clientId = process.env.AWS_COGNITO_CLIENT_ID;
  const clientSecret = process.env.AWS_COGNITO_CLIENT_SECRET;

  const hmac = crypto.createHmac("SHA256", clientSecret);
  hmac.update(username + clientId);
  return hmac.digest("base64");
};
export { awsConfig, generateSecretHash };
