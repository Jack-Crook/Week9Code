const { ObjectId } = require("mongodb");

function removeProduct(app, products) {
  app.delete("/products/:id", async (req, res) => {
    try {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid _id" });
      }

      const result = await products.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ deleted: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

module.exports = { removeProduct };