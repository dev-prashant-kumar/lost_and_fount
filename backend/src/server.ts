import express from "express";
import { prisma } from "./lib/prisma.js";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

import { authenticate } from "./middleware/auth.middleware";

app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "You are authenticated!" });
});