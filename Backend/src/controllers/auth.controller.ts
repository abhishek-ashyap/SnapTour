import { Request, Response } from "express";
import db from "../db";

/**
 * Called AFTER successful Supabase login/signup.
 * Ensures a local profile exists.
 */
export const syncProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const { id } = req.user;

    await db.query(
      `
      INSERT INTO profiles (id)
      VALUES ($1)
      ON CONFLICT (id) DO NOTHING
      `,
      [id]
    );

    const result = await db.query(
      `
      SELECT id, role, created_at
      FROM profiles
      WHERE id = $1
      `,
      [id]
    );

    res.status(200).json({ profile: result.rows[0] });
  } catch (err: any) {
    console.error("syncProfile error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
