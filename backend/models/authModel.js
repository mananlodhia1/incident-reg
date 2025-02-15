import {
  AdminInitiateAuthCommand,
  AdminUserGlobalSignOutCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { generateSecretHash, awsConfig } from "../config/awsConfig.js";
import { ValidationError } from "../utils/errors.js";

export const authenticateUser = async (authPayload) => {
  const { username, password } = authPayload;

  const params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: generateSecretHash(username),
    },
  };
  try {
    const command = new AdminInitiateAuthCommand(params);
    const data = await awsConfig().send(command);
    const token = data.AuthenticationResult; // Access token
    return token;
  } catch (error) {
    console.error("Cognito authentication error:", error.message);
    throw new ValidationError(error.message);
  }
};

export const refreshToken = async (username, ref_token) => {
  const params = {
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    AuthParameters: {
      REFRESH_TOKEN: ref_token,
      SECRET_HASH: generateSecretHash(username),
    },
  };
  try {
    const command = new AdminInitiateAuthCommand(params);
    const data = await awsConfig().send(command);
    const token = data.AuthenticationResult; // Access token
    return token;
  } catch (error) {
    console.error("Cognito refresh token error:", error);
    throw new ValidationError(error);
  }
};

export const logoutUser = async (username) => {
  const params = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    Username: username,
  };

  try {
    const command = new AdminUserGlobalSignOutCommand(params);
    await awsConfig().send(command);
    return true;
  } catch (error) {
    console.error("Cognito Logout error:", error);
    throw new ValidationError(error);
  }
};
