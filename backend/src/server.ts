import express from "express";
import authRoutes from "./routes/auth.routes";
import dotenv from 'dotenv'
import itemRoutes from "./routes/item.routes.js";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/api", itemRoutes);

app.use("/api",userRoutes )

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

