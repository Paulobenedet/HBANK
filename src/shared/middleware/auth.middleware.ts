import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado.",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;

    req.userId = decoded.id;

    return next();
  } catch {
    return res.status(401).json({
      message: "Token inválido.",
    });
  }
}