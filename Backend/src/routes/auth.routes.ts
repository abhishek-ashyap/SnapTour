import { Router } from "express";
import { syncProfile } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// After Supabase login, frontend calls this
router.post("/sync-profile", authMiddleware, syncProfile);

export default router;
