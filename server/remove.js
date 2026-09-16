// ObjectId is the type Mongo uses for the automatic _id field
const { ObjectId } = require("mongodb");

// Route (3): remove a product using its Mongo _id
function removeProduct(app, products) {
  // DELETE /products/:id, where :id is the product's _id
  app.delete("/products/:id", async (req, res) => {
    try {
      // Get the _id from the URL
      const id = req.params.id;

      // Check the _id is in the right format, otherwise send 400 (Bad Request)
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid _id" });
      }

      // The string from the URL has to be turned into an ObjectId to match in Mongo
      const result = await products.deleteOne({ _id: new ObjectId(id) });

      // If nothing was deleted, no product has that _id, so send 404 (Not Found)
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ deleted: true });
    } catch (err) {
      // 500 means something went wrong on the server
      res.status(500).json({ error: err.message });
    }
  });
}

module.exports = { removeProduct };
