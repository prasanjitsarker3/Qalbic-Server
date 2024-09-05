import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: string
): string => {
  const accessToken = jwt.sign(jwtPayload, secret, {
    expiresIn,
    algorithm: "HS256",
  });
  return accessToken;
};
