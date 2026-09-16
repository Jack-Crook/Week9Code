// MongoClient is the official MongoDB driver used to connect to the database
const { MongoClient } = require("mongodb");

// Import the functions from the other four files
const { addProducts } = require("./add");
const { readProducts } = require("./read");
const { updateProduct } = require("./update");
const { removeProduct } = require("./remove");

// Address of the local mongod process (27017 is Mongo's default port)
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function main() {
    try {
      // Open the connection to MongoDB
      await client.connect();
      console.log("Connected to MongoDB");

      // Use the "mydb" database (Mongo creates it if it does not exist)
      const db = client.db("mydb");

      // Drop the products collection first so we don't get duplicate data each run
      //  catch stops it crashing the first time, when there is nothing to drop
      await db.collection("products").drop().catch(() => {});
      console.log("Dropped products collection");

      // Get the products collection (Mongo creates it when we first insert into it)
      const products = db.collection("products");

      // Run each operation in order, reading after each change to show the result
      console.log("\n--- Add ---");
      await addProducts(products);

      console.log("\n--- Read ---");
      await readProducts(products);

      console.log("\n--- Update ---");
      await updateProduct(products);

      console.log("\n--- Read after update ---");
      await readProducts(products);

      console.log("\n--- Remove ---");
      await removeProduct(products);

      console.log("\n--- Read after delete ---");
      await readProducts(products);
    } catch (err) {
      // Print any error that happens in the steps above
      console.error("Error:", err);
    } finally {
      // Always close the connection, even if something failed
      await client.close();
    }
  }

main();
