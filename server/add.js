// Route (2): add a new product
function addProduct(app, products) {
    // POST /products, the new product is sent as JSON in the request body
    app.post("/products", async (req, res) => {
      try {
        // Use an empty object if no body was sent, so it doesn't crash
        const product = req.body || {};

        // Id must be given and must be a number, otherwise send 400 (Bad Request)
        if (product.Id == null || product.Id === "" || isNaN(Number(product.Id))) {
          return res.status(400).json({ error: "Id is required and must be a number" });
        }

        // store Id as a number so "1" and 1 count as duplicates
        product.Id = Number(product.Id);

        // Check for duplicates: is there already a product with this Id?
        // If so, send 409 (Conflict) 
        const duplicate = await products.findOne({ Id: product.Id });
        if (duplicate) {
          return res.status(409).json({ error: "A product with this Id already exists" });
        }

        // Save the product. Mongo gives it a unique _id automatically.
        // 201 means Created
        const result = await products.insertOne(product);
        res.status(201).json({ insertedId: result.insertedId, product });
      } catch (err) {
        // 500 means something went wrong on the server
        res.status(500).json({ error: err.message });
      }
    });
  }

  module.exports = { addProduct };
