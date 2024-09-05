import { NextFunction, Request, Response } from "express";

import ApiError from "../App/Error/ApiError";
import httpStatus from "http-status";
import { verifyToken } from "../Utilities/veriflyToken";
import config from "../App/config";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Your are not authorization"
        );
      }
      const verifyUser = verifyToken(token, config.accessToken as string);
      req.user = verifyUser;
      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden !");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
