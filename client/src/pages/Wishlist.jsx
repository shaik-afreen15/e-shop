import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";

const EMPTY_ARRAY = [];
const Wishlist = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);

  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const user = reduxUser || storedUser;

  const userId = user?.id;

  const wishlist =
  useSelector(
    (state) => state.wishlist.itemsByUser[userId]
  ) || [];


  if (!userId) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Please login to view your wishlist
      </p>
    );
  }

    if (wishlist.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Your wishlist is empty
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="bg-white shadow rounded p-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-contain mb-4"
            />

            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600">${item.price}</p>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => dispatch(addToCart(item))}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>

              <button
                onClick={() => dispatch(toggleWishlist({
                  userId,
                  product: item,
                })
               )}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
