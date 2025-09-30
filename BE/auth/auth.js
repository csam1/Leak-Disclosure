import express from "express";
import supabase from "../db/index.js";
const router = express.Router();
import { getAuth } from "@clerk/express";

const verifyAuthUser = (req, res, next) => {
  const auth = getAuth(req);
  if (!auth?.isAuthenticated)
    return res.status(401).json({ message: "Unauthorized" });
  if (auth.sessionClaims.metadata.role !== "user") {
    return res.status(401).json({ message: "you are not user" });
  }
  req.clerkId = auth.userId;
  next();
};

router.get("/me", verifyAuthUser, async (req, res) => {
  const clerkId = req.clerkId;
  try {
    const { data: authData, error: authError } = await supabase
      .from("users")
      .select(
        "id",
        "email",
        "subscription",
        "search_count_today",
        "last_search_date",
        "created_at"
      )
      .eq("clerk_id", clerkId)
      .single();
    if (authError) return res.status(400).json({ error: authError.message });
    const { data: analyticsData, error: analyticsError } = await supabase
      .from("analytics_cache")
      .select("total_searches", "total_breaches")
      .eq("id", authData.id)
      .single();
    if (analyticsError)
      return res.status(400).json({ error: analyticsError.message });
    res.json({
      authData,
      analyticsData,
    });
  } catch (error) {
    console.error("Internal error in /me:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
