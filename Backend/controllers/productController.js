// import fetch from "node-fetch";

// export const getProducts = async (req, res) => {
//   try {
//     const allowedCategories = [
//       "beauty",
//       "fragrances",
//       "mens-shirts",
//       "mens-shoes",
//       "womens-dresses",
//       "womens-shoes",
//       "tops",
//       "toys",
//       "home-decoration",
//       "watches",
//     ];

//     const response = await fetch("https://dummyjson.com/products?limit=300");

//     if (!response.ok) {
//       return res.status(500).json({ message: "Failed to fetch products" });
//     }

//     const data = await response.json();

//     const filteredProducts = data.products.filter((product) =>
//       allowedCategories.includes(product.category)
//     );

//     res.status(200).json({
//       success: true,
//       count: filteredProducts.length,
//       products: filteredProducts,
//     });
//   } catch (error) {
//     console.error("Product fetch error:", error);
//     res.status(500).json({ message: "Server error while fetching products" });
//   }
// };

// /* ================= ADMIN ONLY ================= */

// export const addProduct = async (req, res) => {
//   // DummyJSON is read-only → simulate for now
//   res.status(201).json({
//     success: true,
//     message: "Product added (admin only – simulated)",
//     product: req.body
//   });
// };

// export const updateProduct = async (req, res) => {
//   const { id } = req.params;

//   res.status(200).json({
//     success: true,
//     message: `Product ${id} updated (admin only – simulated)`
//   });
// };

// export const deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   res.status(200).json({
//     success: true,
//     message: `Product ${id} deleted (admin only – simulated)`
//   });
// };

import Product from "../models/Product.js";

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET SINGLE PRODUCT =================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// ================= ADD PRODUCT (ADMIN) =================
export const addProduct = async (req, res) => {
  try {
    const { title, price, image, description, category } = req.body;

    // IMAGE VALIDATION (HERE)
    if (!image || !image.startsWith("http")) {
      return res
        .status(400)
        .json({ message: "Image must be a valid public URL" });
    }

    const product = await Product.create({
      title,
      price,
      image,
      description,
      category
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= UPDATE PRODUCT (ADMIN) =================
export const updateProduct = async (req, res) => {
  try {
    const { image } = req.body;

    // IMAGE VALIDATION (ALSO HERE)
    if (image && !image.startsWith("http")) {
      return res
        .status(400)
        .json({ message: "Image must be a valid public URL" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= DELETE PRODUCT (ADMIN) =================
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

