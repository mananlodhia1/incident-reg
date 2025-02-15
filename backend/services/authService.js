import { AppError, ValidationError } from "../utils/errors.js";
import {
  authenticateUser,
  logoutUser,
  refreshToken,
} from "../models/authModel.js";

export const loginUserService = async (authPayload) => {
  try {
    const { username, password } = authPayload;

    if (username === "" || password === "") {
      throw new ValidationError("Username and password are required");
    }

    const token = await authenticateUser(authPayload);
    if (!token) {
      throw new ValidationError("No token received");
    }
    return token; // Send the token back in the response
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error("Login service error:", error);
      throw new ValidationError(error.message);
    }
    throw error;
  }
};

export const refreshTokenService = async (username, ref_token) => {
  try {
    if (!ref_token) {
      throw new ValidationError("No refresh token");
    }

    const token = await refreshToken(username, ref_token);

    return token; // Send the token back in the response
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error("Refresh token service error:", error);
      throw new ValidationError(error.message);
    }
    throw error;
  }
};

export const logoutService = async (username) => {
  try {
    await logoutUser(username);
    return true;
  } catch (error) {
    if (!(error instanceof AppError)) {
      console.error("Logout service error:", error);
      throw new ValidationError(error.message);
    }
    throw error;
  }
};
