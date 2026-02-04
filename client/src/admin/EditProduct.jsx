import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${VITE_API_URL}/api/products/${id}`
        );

        setProduct({
          title: data.title,
          price: data.price,
          image: data.image,
          category: data.category,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      category: product.category.toLowerCase(),
    };

    try {
      const res = await fetch(
        `${VITE_API_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("Product updated successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={product.title}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Title"
          required
        />

        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Price"
          required
        />

        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Image URL"
          required
        />

        <select
          name="category"
          className="border p-2 w-full"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="beauty">Beauty</option>
          <option value="electronics">Electronics</option>
        </select>

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Description"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
