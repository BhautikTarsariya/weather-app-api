import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.header("Authorization")?.replace("Bearer ", "");
  const token =
    req.body.token ||
    req.query.token ||
    req.params.token ||
    req.headers["x-access-token"];

  console.log(token);
  if (!token) {
    throw Error("Unauthorised: A token is required for authentication");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  req.body.user = decoded;
  next();
};
