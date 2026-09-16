const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // reads JSON sent in a request and puts it in req.body
const { MongoClient } = require("mongodb");

// Import the functions from the other files. Each one sets up a route.
const { createCollection } = require("./create");
const { addProduct } = require("./add");
const { readProducts } = require("./read");
const { updateProduct } = require("./update");
const { removeProduct } = require("./remove");

// Connection to MongoDB
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const app = express();
const PORT = 3000;

// Middleware: runs on every request before it reaches a route
app.use(cors());
app.use(bodyParser.json());

async function start() {
  // Connect to MongoDB before accepting any requests
  await client.connect();
  console.log("Connected to MongoDB");

  // Use the  database and make sure the products collection exists
  const db = client.db("mydb");
  const products = await createCollection(db);

  // Register all the routes, passing in the app and the collection
  readProducts(app, products);   // GET    /products
  addProduct(app, products);     // POST   /products
  removeProduct(app, products);  // DELETE /products/:id
  updateProduct(app, products);  // PUT    /products/:id

  // Start listening for requests
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
});
