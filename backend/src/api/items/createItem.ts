import { Request, Response } from "express";
import { createItem } from "../../services/item_service";

export async function createItemHandler(req: Request, res: Response) {
  try {
    const item = await createItem(req.body);
    res.status(200).json(item);
  } catch (err) {
    console.error("Create item error:", err);

    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
}