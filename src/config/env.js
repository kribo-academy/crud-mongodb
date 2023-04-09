import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const PREFIX = process.env.PREFIX || "/api/v1";
const DBNAME = process.env.DBNAME;

export { PORT, PREFIX, DBNAME };
