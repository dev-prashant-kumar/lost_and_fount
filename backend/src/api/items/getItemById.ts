import { Request, Response } from "express";
import { getItemById } from "../../services/item_service";

interface Params {
  id: string;
}

export async function getItemByIdHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    const item = await getItemById(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}