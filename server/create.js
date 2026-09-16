// Makes sure the products collection exists and returns it
async function createCollection(db) {
    // Look for a collection called "products"
    const collections = await db.listCollections({ name: "products" }).toArray();

    // If none was found, create it. Otherwise use the one that is already there.
    if (collections.length === 0) {
      await db.createCollection("products");
      console.log("Created products collection");
    } else {
      console.log("Using existing products collection");
    }

    // Give the collection back to server.js so the routes can use it
    return db.collection("products");
  }

  module.exports = { createCollection };
