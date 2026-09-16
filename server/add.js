function addProduct(app, products) {
    app.post("/products", async (req, res) => {
      try {
        const product = req.body;
  
        if (product.Id == null) {
          return res.status(400).json({ error: "Id is required" });
        }
  
        const duplicate = await products.findOne({ Id: product.Id });
        if (duplicate) {
          return res.status(409).json({ error: "A product with this Id already exists" });
        }
  
        const result = await products.insertOne(product);
        res.status(201).json({ insertedId: result.insertedId, product });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  }
  
  module.exports = { addProduct };