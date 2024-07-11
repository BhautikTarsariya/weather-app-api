import express, { Express } from "express";
import routes from "./routes/index";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { Client } from "pg";

const app: Express = express();

dotenv.config();

const corsOpts = {
  credentials: true,
  methods: ["POST", "PUT", "GET", "DELETE", "HEAD"],
  origin: ["https://localhost:3000", "https://example.com"],
};

app.use(cors(corsOpts));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(bodyParser.json());

export const client = new Client({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: 5432,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const PORT: string | number = process.env.PORT || 5000;

client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("DB is Connected");
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database ERROR: ${err}`);
  });

routes(app);
