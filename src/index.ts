import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome to the Express app!");
});

// db connect
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "testdatabase",
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // Start the server
    app.listen(port, (): void => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
