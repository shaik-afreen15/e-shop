import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/ProductSlice";

const Shop = () => {
  const dispatch = useDispatch();

  // NEW: category state
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = useSelector(
    (state) => state.products?.items || []
  );

  const loading = useSelector(
    (state) => state.products.loading
  );

  const searchQuery = useSelector(
    (state) => state.search?.query || ""
  );

  // Fetch ALL products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // UPDATED: search + category filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all"
        ? true
        : product.category?.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="mx-auto py-12 px-4 md:px-16 lg:px-24">
      <div className="flex justify-start mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="all">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="beauty">Beauty</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Shop</h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;

