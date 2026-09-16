async function addProducts(products) {
    const result = await products.insertMany([
      {
        Id: 1,
        Name: "USB-C Cable",
        Description: "1 metre braided charging cable",
        Price: 12.99,
        units: 40,
        type: "Accessory"
      },
      {
        Id: 2,
        Name: "Wireless Mouse",
        Description: "Ergonomic mouse with USB receiver",
        Price: 24.5,
        units: 15,
        type: "Peripheral"
      },
      {
        Id: 3,
        Name: "A5 Notebook",
        Description: "Lined notebook with hardcover",
        Price: 4.0,
        units: 100,
        type: "Stationery"
      }
    ]);
  
    console.log(`Added ${result.insertedCount} products`);
  }
  
  module.exports = { addProducts };