// Route (1): get a list of all products
function readProducts(app, products) {
    // GET /products
    app.get("/products", async (req, res) => {
      try {
        // Find every product and send them back as a JSON array
        const items = await products.find().toArray();
        res.json(items);
      } catch (err) {
        // 500 means something went wrong on the server
        res.status(500).json({ error: err.message });
      }
    });
  }

  module.exports = { readProducts };
