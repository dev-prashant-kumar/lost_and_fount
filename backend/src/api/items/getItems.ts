import { Request, Response } from "express";
import { getItems } from "../../services/item_service";

export async function getItemsHandler(req: Request, res: Response) {
  try {
    const items = await getItems();

    if (!items || items.length === 0) {
      return res.status(200).json({
        message: "No items found",
        data: []
      });
    }

    res.status(200).json({
      data: items
    });

  } catch (error) {
    console.error("Get items error:", error);

    res.status(500).json({
      error: "Failed to fetch items"
    });
  }
}