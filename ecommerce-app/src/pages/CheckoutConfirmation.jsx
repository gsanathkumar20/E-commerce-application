import React, { useEffect, useState } from "react";
import { CheckCircle, Home } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function CheckoutConfirmation() {
  const { cart, clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length > 0) {
      // Set order details based on the current cart
      setOrderDetails({
        items: [...cart],
        total: cart.reduce(
          (sum, item) =>
            sum + (item.discountPrice || item.price) * item.quantity,
          0
        ),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });

      // Clear the cart after a short delay (e.g., 1 second)
      const timer = setTimeout(() => {
        clearCart();
      }, 1000); // Adjust the delay as needed

      // Cleanup the timer to avoid memory leaks
      return () => clearTimeout(timer);
    } else {
      // If the cart is empty, redirect to home
      navigate("/");
    }
  }, [cart, clearCart, navigate]);

  if (!orderDetails) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          <div className="text-center mb-10">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
              Thank you for your order!
            </h1>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutConfirmation;
