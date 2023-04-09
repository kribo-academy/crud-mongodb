import Users from "../modules/users.js";
import messages from "../utils/messages.js";
import { ObjectId } from "mongodb";
import fs from "fs";

const createUser = async (req, res) => {
  const data = req.body;
  const file = req.file;

  if (!data.email || !data.password)
    return messages(res, 423, "Properti Email/Password is required");

  const checkEmail = await Users.findOne({ email: data.email });

  if (checkEmail) {
    if (file) {
      const path = file.path;
      fs.unlinkSync(path);
    }

    return messages(res, 423, "Email has been register");
  }

  if (file) data.image = file.filename;

  Users.insertOne(data)
    .then(() => {
      messages(res, 201, "Create user success", data);
    })
    .catch((error) => {
      messages(res, 500, error?.message || "Internal server error");
    });
};

const allUser = async (req, res) => {
  const q = req.query.q ? req.query.q : "";

  const sort_by = req.query.sort_by ? req.query.sort_by.toLowerCase() : "asc";
  const sort_key = sort_by === "asc" ? 1 : -1;

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const per_page = req.query.per_page ? parseInt(req.query.per_page) : 25;

  const pages = page === 1 ? 0 : (page - 1) * per_page;

  try {
    const total = await Users.count({ email: { $regex: q, $options: "i" } });
    const users = await Users.find({ email: { $regex: q, $options: "i" } })
      .sort({ _id: sort_key })
      .skip(pages)
      .limit(per_page)
      .toArray();

    messages(res, 200, "All data", users, { page, per_page, total });
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

const detailUser = async (req, res) => {
  const id = req.params.id;

  if ([null, undefined, ":id"].includes(id))
    return messages(res, 400, "Missing params id");

  try {
    const _id = new ObjectId(id);
    const detail = await Users.findOne({ _id });

    if (detail) return messages(res, 200, "Detail user", detail);

    messages(res, 404, "User ID not found");
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if ([null, undefined, ":id"].includes(id))
    return messages(res, 400, "Missing params id");

  try {
    const _id = new ObjectId(id);
    const result = await Users.updateOne({ _id }, { $set: { ...data } });

    if (result.modifiedCount) return messages(res, 200, "Update user success");

    messages(res, 200, "All ready update");
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  if ([null, undefined, ":id"].includes(id))
    return messages(res, 400, "Missing params id");

  try {
    const _id = new ObjectId(id);
    const data = await Users.deleteOne({ _id });

    if (data.deletedCount) return messages(res, 200, "Delete user success");

    messages(res, 404, "User ID not found");
  } catch (error) {
    messages(res, 500, error?.message || "Internal server error");
  }
};

export { createUser, allUser, detailUser, updateUser, deleteUser };
