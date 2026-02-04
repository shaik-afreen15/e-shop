import React, { useState } from "react";
import EmptyCart from "../assets/Images/Cart.png";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../components/Modal";
import ChangeAddress from "../components/ChangeAddress";
import { decreaseQuantity, increaseQuantity, removeFromCart} from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState("main street, 0012");
  const [isModelOpen, setIsModelOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6 min-h-screen px-3 sm:px-6 lg:px-16">
      {cart.products.length > 0 ? (
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6">
            SHOPPING CART
          </h3>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <div className="hidden md:flex justify-between border-b pb-2 mb-4 text-xs font-semibold text-gray-600">
                <p>PRODUCT</p>
                <div className="flex gap-10">
                  <p>PRICE</p>
                  <p>QTY</p>
                  <p>SUBTOTAL</p>
                  <p>REMOVE</p>
                </div>
              </div>

              {cart.products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row md:items-center justify-between border-b py-4 gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain border rounded"
                    />
                    <h3 className="text-sm sm:text-base font-medium">
                      {product.title}
                    </h3>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between md:justify-end gap-3 md:gap-8 text-sm">

                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-gray-500">Price</span>
                      <p className="min-w-[60px] text-gray-700">
                        ${product.price}
                      </p>
                    </div>

                    <div className="flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-gray-500">Qty</span>
                      <div className="flex items-center border rounded">
                        <button
                          className="px-2 py-1 text-sm font-bold border-r hover:bg-gray-100"
                          onClick={() =>
                            dispatch(decreaseQuantity(product.id))
                          }
                        >
                          -
                        </button>
                        <p className="px-3 text-sm">{product.quantity}</p>
                        <button
                          className="px-2 py-1 text-sm font-bold border-l hover:bg-gray-100"
                          onClick={() =>
                            dispatch(increaseQuantity(product.id))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between md:block">
                      <span className="md:hidden text-gray-500">Subtotal</span>
                      <p className="min-w-[70px] font-medium">
                        ${(product.quantity * product.price).toFixed(2)}
                      </p>
                    </div>

                    <button
                      className="self-end md:self-auto text-red-500 hover:text-red-700"
                      onClick={() =>
                        dispatch(removeFromCart(product.id))
                      }
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-white p-5 rounded-lg shadow border sticky top-24">
                <h3 className="text-base font-semibold mb-4">CART TOTAL</h3>

                <div className="flex justify-between border-b pb-2 mb-3 text-sm">
                  <span>Total Items</span>
                  <span className="font-medium">
                    {cart.totalQuantity}
                  </span>
                </div>

                <div className="border-b pb-3 mb-3 text-sm">
                  <p className="font-medium mb-1">Shipping</p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    To:
                    <span className="ml-1 font-semibold">
                      {address}
                    </span>
                  </p>

                  <button
                    className="text-blue-500 text-xs hover:underline mt-1"
                    onClick={() => setIsModelOpen(true)}
                  >
                    Change address
                  </button>
                </div>

                <div className="flex justify-between mb-4 text-sm font-semibold">
                  <span>Total Price</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>

                <button
                  className="w-full bg-red-600 text-white py-2 text-sm rounded hover:bg-red-700 transition"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

          <Modal
            isModelOpen={isModelOpen}
            setIsModelOpen={setIsModelOpen}
          >
            <ChangeAddress
              setAddress={setAddress}
              setIsModelOpen={setIsModelOpen}
            />
          </Modal>
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <img
            src={EmptyCart}
            alt="Empty Cart"
            className="h-56 sm:h-72"
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
