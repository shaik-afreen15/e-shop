import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/authSlice";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AdminRoute from "./routes/AdminRoute";

import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProducts";
import EditProduct from "./admin/EditProduct";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Order = lazy(() => import("./pages/Order"));
const Login = lazy(() => import("./pages/Login"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Mens = lazy(() => import("./pages/Mens"));
const Womens = lazy(() => import("./pages/Womens"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Profile = lazy(() => import("./pages/Profile"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  // Restore login after refresh
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <div className="pt-32 min-h-screen">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[60vh] text-lg font-semibold">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout setOrder={setOrder} />} />
            <Route
              path="/OrderConfirmation"
              element={<Order order={order} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/womens" element={<Womens />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ===== ADMIN ROUTES ===== */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/add-product"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/edit-product/:id"
              element={
                <AdminRoute>
                  <EditProduct />
                </AdminRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
