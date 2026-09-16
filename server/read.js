function readProducts(app, products) {
    app.get("/products", async (req, res) => {
      try {
        const items = await products.find().toArray();
        res.json(items);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  }
  
  module.exports = { readProducts };