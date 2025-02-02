import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import route from "./routes/routes.js";
dotenv.config();
const app = express();
app.use(cors());

app.use("/", route);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
