import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.SUPABASE_JWT_SECRET;

    if (!secret) {
      console.error("❌ SUPABASE_JWT_SECRET not configured");
      return res.status(500).json({ msg: "Server configuration error" });
    }

    const decoded = jwt.verify(token, secret) as any;

    if (!decoded?.sub) {
      return res.status(401).json({ msg: "Invalid token payload" });
    }

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: "creator", // default; real role resolved from DB when needed
    };

    next();
  } catch (err: any) {
    console.error("authMiddleware error:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
