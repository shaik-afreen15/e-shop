import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log("PRODUCTS FROM API:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${VITE_API_URL}/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/add-product"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="border-b bg-gray-100 text-left">
            <th className="p-3 w-24 text-center">Image</th>
            <th className="p-3 w-1/2">Title</th>
            <th className="p-3 w-24 text-center">Price</th>
            <th className="p-3 w-32 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50">
              <td className="p-3 text-center">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-16 w-16 object-cover mx-auto rounded"
                />
              </td>

              <td className="p-3 align-middle">
                <span className="font-medium">{p.title}</span>
              </td>

              <td className="p-3 text-center font-semibold">
                ${p.price}
              </td>

              <td className="p-3 text-center space-x-3">
                <Link
                  to={`/admin/edit-product/${p._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
