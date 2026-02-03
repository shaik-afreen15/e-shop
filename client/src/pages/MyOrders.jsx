import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/orders/my-orders", {
         headers: {
         Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server error:", errorText);
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data);

      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getDeliveryDates = (deliveryDate) => {
    const date = new Date(deliveryDate);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeleteOrder = async (orderId) => {
  const token = localStorage.getItem("token");

  if (!window.confirm("Are you sure you want to delete this order?")) return;

  try {
    const res = await fetch(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete order");
    }

    // remove deleted order from UI
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order._id !== orderId)
    );
  } catch (err) {
    console.error(err);
    alert("Failed to delete order");
  }
};

  const handleCancelOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Cancel this order?")) return;

    const res = await fetch(
      `http://localhost:5000/api/orders/${orderId}/cancel`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) {
      alert("Cannot cancel this order");
      return;
    }

    // update status in UI
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-24 py-10">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border rounded-lg shadow p-6 mb-6"
        >
          {/* Order Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold">
                Order ID:{" "}
                <span className="text-gray-700">{order.orderId}</span>
              </p>
              <p className="text-sm text-gray-600">
                Delivery by {getDeliveryDates(order.deliveryDate)}
              </p>
            </div>

            <span
              className={`font-medium ${
                order.status === "Cancelled"
                  ? "text-red-600"
                  : order.status === "Delivered"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Product Images */}
          <div className="flex gap-4 flex-wrap">
            {order.items.map((item,index) => (
              <img
                key={`${order._id}-${item.name}-${index}`}
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain border rounded"
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-between items-center border-t pt-4">
            <p className="font-semibold">
              Total: ${order.totalAmount.toFixed(2)}
            </p>
            <div className="flex gap-3">
              {order.status === "Placed" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="text-orange-600 border border-orange-600 px-4 py-1 rounded hover:bg-orange-600 hover:text-white"
                >
                  Cancel Order
                </button>
              )}
            
             <button
                onClick={() => handleDeleteOrder(order._id)}
                className="text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition"
                >
                 Delete
              </button> 
          </div> 
        </div>
      </div>
      ))}
    </div>
  ); 
};

export default Order;
