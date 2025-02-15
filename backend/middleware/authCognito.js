import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { awsConfig } from "../config/awsConfig.js";

const authCognito = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    // Validate the token
    const command = new GetUserCommand({ AccessToken: token });
    const userData = await awsConfig().send(command);

    // Attach user data to the request object
    req.user = userData;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authCognito;
