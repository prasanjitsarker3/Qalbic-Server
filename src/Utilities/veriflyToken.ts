import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
