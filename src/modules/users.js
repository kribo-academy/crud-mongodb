import connection from "../config/mongodb.js";

const Users = connection.collection("users");

export default Users;
