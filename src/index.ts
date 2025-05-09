import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "reflect-metadata";
// routes
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";

import AppDataSource from "./dbconnect/dbconnect";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// db connect

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
