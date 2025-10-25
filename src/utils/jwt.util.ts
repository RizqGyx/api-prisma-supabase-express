const jwt = require("jsonwebtoken");
const { ENV } = require("../config/env");

export const signToken = (payload: object, expiresIn = "7d") => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};
