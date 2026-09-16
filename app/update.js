// update one product in the collection
async function updateProduct(products) {
    // First object is the filter (find the product with Id 2).
    // $set only changes the fields listed and leaves the rest alone.
    const result = await products.updateOne(
      { Id: 2 },
      { $set: { Price: 19.99, units: 12, Description: "Updated: quieter click mouse" } }
    );

    // matchedCount = products found, modifiedCount = products actually changed
    console.log(`Matched ${result.matchedCount}, updated ${result.modifiedCount}`);
  }

  // Export the function so app.js can use it
  module.exports = { updateProduct };
