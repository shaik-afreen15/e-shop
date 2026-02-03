import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../redux/ProductSlice";

const Womens = () => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.items);
  const loading = useSelector(state => state.products.loading);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const womenProducts = products.filter(
  p => p.category?.toLowerCase() === "women"
);


  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Men's Category</h1>

      {womenProducts.length === 0 ? (
        <p className="text-gray-500">No men's products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {womenProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Womens;
