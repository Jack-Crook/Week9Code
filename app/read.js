//  find and show every product in the collection
async function readProducts(products) {
    // find() with no filter matches everything, toArray() turns the results into an array
    const items = await products.find().toArray();
    console.log("All products:");
    console.log(items);
  }

  // Export the function so app.js can use it
  module.exports = { readProducts };
