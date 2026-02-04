
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

export const updateProduct = async (req, res) => {
  try {
    const { image } = req.body;


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


export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

