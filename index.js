import express from "express";
import cors from "cors";
import r_users from "./src/routers/users.js";
import { PREFIX, PORT } from "./src/config/env.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(PREFIX, r_users);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
