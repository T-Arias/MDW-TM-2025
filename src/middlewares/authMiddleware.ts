import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtUser {
  id: string;
  email: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtUser;
  }
}

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }
  const token = header.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtUser;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
