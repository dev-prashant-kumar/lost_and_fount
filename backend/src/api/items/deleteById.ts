import { Request, Response } from "express";
import { deleteItem } from "../../services/item_service";

interface Params {
  id: string;
}

export async function deleteItemHandler(
  req: Request<Params>,
  res: Response
) {
  try {
    const { id } = req.params;

    const result = await deleteItem(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
}