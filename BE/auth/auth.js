import express from "express";
import supabase from "../db/index.js";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";


router.get("/me", authMiddleware, async (req, res) => {
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
      .eq("user_id", authData.id)
      .single();
    if (analyticsError)
      return res.status(400).json({ error: analyticsError.message });
    res.json({
  user: authData,
  analytics: analyticsData
});
  } catch (error) {
    console.error("Internal error in /me:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router