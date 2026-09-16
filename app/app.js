const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("mydb");
    const products = db.collection("Products");

    const allProducts = await products.find().toArray();
    console.log(allProducts);
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await client.close();
  }
}

main();