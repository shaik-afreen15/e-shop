import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaTimes,
  FaEllipsisV,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchQuery, setSearchQuery } from "../redux/SearchSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart?.products || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // AUTH STATE
  const isLoggedIn = !!localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser?.role === "ADMIN";

  const hideSearchRoutes = ["/cart", "/checkout", "/OrderConfirmation"];
  const hideSearch = hideSearchRoutes.includes(location.pathname);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    dispatch(setSearchQuery(value));
    navigate("/shop");
  };

  const handleClear = () => {
    setSearchText("");
    dispatch(clearSearchQuery());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">e-SHOP</Link>
        </div>

        {!hideSearch && (
          <div className="relative flex-1 mx-6">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleChange}
              className="w-full border py-2 px-4"
            />

            {searchText ? (
              <FaTimes
                onClick={handleClear}
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
              />
            ) : (
              <FaSearch className="absolute top-3 right-3 text-red-500" />
            )}
          </div>
        )}

        <div className="flex items-center space-x-4 mx-4 relative">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-lg" />
            {products.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {products.length}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hidden md:block">
                Login
              </Link>
              <Link to="/login" className="block md:hidden">
                <FaUser />
              </Link>
            </>
          ) : (
            <div className="relative">
              <FaEllipsisV
                className="cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {menuOpen && (
                <div className="absolute right-0 top-6 bg-white border shadow-md rounded w-40 text-sm z-50">
                  
                  {/* 🔥 ADMIN DASHBOARD */}
                  {isAdmin && (
                    <button
                      onClick={() => {
                        navigate("/admin");
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 font-semibold hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/my-orders");
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </button>

                  <button
                    onClick={() => {
                      navigate("/wishlist");
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Wishlist
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/shop" className="hover:underline">
          Shop
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/about" className="hover:underline">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
