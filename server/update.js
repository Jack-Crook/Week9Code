// ObjectId is the type Mongo uses for the automatic _id field
const { ObjectId } = require("mongodb");

// Route (4): update a product using its Mongo _id
function updateProduct(app, products) {
  // PUT /products/:id, where :id is the _id and the new data is in the body
  app.put("/products/:id", async (req, res) => {
    try {
      // Get the _id from the URL
      const id = req.params.id;

      // Check the _id is in the right format, otherwise send 400 (Bad Request)
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid _id" });
      }

      // Take _id out of the body because Mongo doesn't allow _id to be changed.
      // Everything else goes into updatedData.
      const { _id, ...updatedData } = req.body || {};

      if (updatedData.Id != null) {
        updatedData.Id = Number(updatedData.Id);

        // don't let an update take an Id that another product already has
        const duplicate = await products.findOne({
          Id: updatedData.Id,
          _id: { $ne: new ObjectId(id) }, // $ne means "not equal", so skip this product itself
        });
        if (duplicate) {
          return res.status(409).json({ error: "A product with this Id already exists" });
        }
      }

      // Find the product by _id and change only the fields that were sent
      const result = await products.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      // If nothing matched, no product has that _id, so send 404 (Not Found)
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ updated: true });
    } catch (err) {
      // 500 means something went wrong on the server
      res.status(500).json({ error: err.message });
    }
  });
}

module.exports = { updateProduct };
