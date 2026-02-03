import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCart } from "../redux/CartSlice"

const Order = ({ order }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Safety if user refreshes or directly opens URL
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">No order found</h2>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Go to Checkout
        </button>
      </div>
    )
  }

   //clear cart
     useEffect(() => {
    if (order) {
      dispatch(clearCart());
    }
  }, [dispatch, order]);

  // Delivery
    const getDeliveryDates = () => {
    const today = new Date();

    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 3);

    const formatDate = (date) =>
      date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  };

  return (
    <div className="container mx-auto px-4 md:px-16 lg:px-24 py-10">
      <div className="max-w-3xl mx-auto bg-white border shadow-lg rounded-lg p-8">

        <h2 className="text-3xl font-bold text-green-600 mb-3">
          Thank you for your order
        </h2>

        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. You will receive an email shortly.
        </p>

        <div className="border-t pt-6 space-y-6">

          <div>
            <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
            <p className="text-gray-700">
              Order Number: <span className="font-medium">{order.orderNumber}</span>
            </p>
            <p className="text-gray-700">
              Total Price: <span className="font-medium">${order.totalPrice}</span>
            </p>
             <p className="text-gray-700">
              Estimated Delivery:{" "}
              <span className="font-medium text-green-700">
                {getDeliveryDates()}
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>

            <div className="bg-gray-50 border rounded p-4 space-y-1">
              <p>
                <span className="font-medium">Address:</span>{" "}
                {order.shippingInformation.address}
              </p>

              <p>
                <span className="font-medium">City:</span>{" "}
                {order.shippingInformation.city}
              </p>

              <p>
                <span className="font-medium">Zip Code:</span>{" "}
                {order.shippingInformation.zip}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Order
