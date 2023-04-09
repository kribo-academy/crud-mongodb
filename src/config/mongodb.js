import { MongoClient } from "mongodb";
import { DBNAME } from "./env.js";

const url = `mongodb://localhost:27017`;
const connection = new MongoClient(url, { useUnifiedTopology: true });

(async () => {
  try {
    await connection.connect();
  } catch (error) {
    console.log("MongoDB", error);
  }
})();

const db = connection.db(DBNAME);
export default db;
