import { Request, Response } from "express";
import { updateUserProfile } from "../../services/user_services";


export async function updateProfileHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const updatedUser = await updateUserProfile(id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
}