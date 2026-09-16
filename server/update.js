const { ObjectId } = require("mongodb");

function updateProduct(app, products) {
  app.put("/products/:id", async (req, res) => {
    try {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid _id" });
      }

      const { _id, ...updatedData } = req.body;

      const result = await products.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ updated: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

module.exports = { updateProduct };