const { MongoClient } = require("mongodb");
const { addProducts } = require("./add");
const { readProducts } = require("./read");
const { updateProduct } = require("./update");
const { removeProduct } = require("./remove");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function main() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
  
      const db = client.db("mydb");
  
      await db.collection("products").drop().catch(() => {});
      console.log("Dropped products collection");
  
      const products = db.collection("products");
  
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
      console.error("Error:", err);
    } finally {
      await client.close();
    }
  }

main();