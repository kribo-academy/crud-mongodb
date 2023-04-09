import express from "express";
import {
  allUser,
  createUser,
  detailUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
const Router = express.Router();

Router.get("/users", allUser);
Router.get("/users/:id", detailUser);
Router.post("/users", createUser);
Router.put("/users/:id", updateUser);
Router.delete("/users/:id", deleteUser);

export default Router;
