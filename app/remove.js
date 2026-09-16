// delete one product from the collection
async function removeProduct(products) {
    // deleteOne removes the first product that matches the filter (Id 3)
    const result = await products.deleteOne({ Id: 3 });
    console.log(`Deleted ${result.deletedCount} product(s)`);
  }

  // Export the function so app.js can use it
  module.exports = { removeProduct };
