async function createCollection(db) {
    const collections = await db.listCollections({ name: "products" }).toArray();
  
    if (collections.length === 0) {
      await db.createCollection("products");
      console.log("Created products collection");
    } else {
      console.log("Using existing products collection");
    }
  
    return db.collection("products");
  }
  
  module.exports = { createCollection };