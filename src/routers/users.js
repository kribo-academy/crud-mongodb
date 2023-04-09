import express from "express";
import {
  allUser,
  createUser,
  detailUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import upload from "../midlleware/upload.js";

const Router = express.Router();

Router.get("/users", allUser);
Router.get("/users/:id", detailUser);
Router.post("/users", upload.single("image"), createUser);
Router.put("/users/:id", updateUser);
Router.delete("/users/:id", deleteUser);

export default Router;
