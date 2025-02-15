import {
  loginUserService,
  logoutService,
  refreshTokenService,
} from "../services/authService.js";

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const token = await loginUserService({
      username: username,
      password: password,
    });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  const { username, ref_token } = req.body;
  try {
    const token = await refreshTokenService(username, ref_token);
    return res.status(200).json({ token }); // Send the new token back in the response
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  const { username } = req.body;
  try {
    await logoutService(username);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.clearCookie("ref_token");
    next(error);
  }
};

