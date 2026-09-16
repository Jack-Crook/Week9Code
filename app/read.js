async function readProducts(products) {
    const items = await products.find().toArray();
    console.log("All products:");
    console.log(items);
  }
  
  module.exports = { readProducts };