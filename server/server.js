const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const { createCollection } = require("./create");
const { addProduct } = require("./add");
const { readProducts } = require("./read");
const { updateProduct } = require("./update");
const { removeProduct } = require("./remove");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

async function start() {
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db("mydb");
  const products = await createCollection(db);

  readProducts(app, products);
  addProduct(app, products);
  removeProduct(app, products);
  updateProduct(app, products);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
});