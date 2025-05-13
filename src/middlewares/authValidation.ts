import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token given" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY! as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token." });
      }

      // Attach the decoded user info to the request
      req.user = decoded.user;
      next();
    }
  );
};
