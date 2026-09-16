async function updateProduct(products) {
    const result = await products.updateOne(
      { Id: 2 },
      { $set: { Price: 19.99, units: 12, Description: "Updated: quieter click mouse" } }
    );
  
    console.log(`Matched ${result.matchedCount}, updated ${result.modifiedCount}`);
  }
  
  module.exports = { updateProduct };