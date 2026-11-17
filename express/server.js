
import express from "express";

const app = express();
app.use(express.json());

const products = [];

// Create a product - POST http://localhost:5000/products
app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(200).json({ message: "Product created successfully", data: newProduct });
});

// Read all products - GET http://localhost:5000/products
app.get("/products", (req, res) => {
  res.status(200).json({ message: "All products read successfully", data: products });
});

// Read a particular product by ID - GET http://localhost:5000/products/:id
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((prod) => prod.id === productId);
  if (product) {
    res.status(200).json({ message: "Product details fetched successfully", data: product });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// Update a product by ID - PUT http://localhost:5000/products/:id
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updateData = req.body;
  const productIndex = products.findIndex((prod) => prod.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updateData };
    res.status(200).json({ message: "Updated successfully", data: products[productIndex] });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

// Delete a product by ID - DELETE http://localhost:5000/products/:id
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((prod) => prod.id === productId);

  if (productIndex !== -1) {
    const deletedProducts = products.splice(productIndex, 1);
    res.status(200).json({ message: "Deleted successfully", data: deletedProducts[0] });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
