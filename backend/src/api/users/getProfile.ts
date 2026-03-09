import { Request, Response } from "express";
import { getUserProfile } from "../../services/user_services";

export async function getProfileHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const user = await getUserProfile(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
  console.error("Get profile error:", error);

  res.status(500).json({
    error: "Internal server error"
  });
}
}