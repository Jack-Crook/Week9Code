async function removeProduct(products) {
    const result = await products.deleteOne({ Id: 3 });
    console.log(`Deleted ${result.deletedCount} product(s)`);
  }
  
  module.exports = { removeProduct };