import express from "express";
import { createItemHandler } from "../api/items/createItem";
import { getItemsHandler } from "../api/items/getItems";
import { getItemByIdHandler } from "../api/items/getItemById";
import { deleteItemHandler } from "../api/items/deleteById";


const router = express.Router();

router.post("/items", createItemHandler);
router.get("/items", getItemsHandler);
router.get("/items/:id", getItemByIdHandler);
router.delete("/items/:id", deleteItemHandler);

export default router;