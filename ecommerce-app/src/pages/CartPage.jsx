import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import {
  Trash2,
  ShoppingBag,
  ChevronRight,
  Plus,
  Minus,
  ArrowRight,
  CreditCard,
} from "lucide-react";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [selectedShipping, setSelectedShipping] = useState(
    shippingOptions[0].id
  );

  const currentShipping = shippingOptions.find(
    (option) => option.id === selectedShipping
  );

  // Handle coupon application
  const applyCoupon = () => {
    // Reset messages
    setCouponError("");
    setCouponSuccess("");

    // Mock coupon check
    if (couponCode.toLowerCase() === "save10") {
      setCouponSuccess("Coupon applied successfully!");
      setDiscount(getCartTotal() * 0.1); // 10% discount
    } else {
      setCouponError("Invalid coupon code");
      setDiscount(0);
    }
  };

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = currentShipping.price;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax - discount;

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true);

    // In a real app, you'd call your payment processing API here
    // For this demo, we'll just simulate a successful checkout after a short delay
    setTimeout(() => {
      clearCart();
      alert("Order placed successfully! Thank you for your purchase.");
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="py-6 first:pt-0 last:pb-0"
                    >
                      <div className="flex">
                        {/* Product Image */}
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/product/${item.id}`}>
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                {formatCurrency(
                                  item.discountPrice || item.price
                                )}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 capitalize">
                              Color: {item.selectedColor}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Size: {item.selectedSize}
                            </p>
                          </div>

                          <div className="flex flex-1 items-end justify-between mt-2">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - 1),
                                    item.selectedSize,
                                    item.selectedColor
                                  )
                                }
                                className="p-1"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-2 py-1 select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.min(10, item.quantity + 1),
                                    item.selectedSize,
                                    item.selectedColor
                                  )
                                }
                                className="p-1"
                                disabled={item.quantity >= 10}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(
                                  item.id,
                                  item.selectedSize,
                                  item.selectedColor
                                )
                              }
                              className="text-red-500 hover:text-red-700 flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Continue Shopping Link */}
          <div className="flex justify-start mb-8">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <ChevronRight className="w-4 h-4 transform rotate-180 mr-1" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Summary
            </h2>

            {/* Subtotal */}
            <div className="flex justify-between py-2 border-b border-gray-200">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(subtotal)}
              </p>
            </div>

            {/* Shipping */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Shipping</p>
              <div className="space-y-2">
                {shippingOptions.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={`shipping-${option.id}`}
                      name="shipping-option"
                      type="radio"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      checked={selectedShipping === option.id}
                      onChange={() => setSelectedShipping(option.id)}
                    />
                    <label
                      htmlFor={`shipping-${option.id}`}
                      className="ml-2 flex flex-1 justify-between"
                    >
                      <span className="text-sm text-gray-700">
                        {option.name}{" "}
                        <span className="text-gray-500">({option.days})</span>
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {option.price === 0
                          ? "Free"
                          : formatCurrency(option.price)}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Estimated Tax */}
            <div className="flex justify-between py-2 border-b border-gray-200">
              <p className="text-sm text-gray-600">Estimated Tax (7%)</p>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(tax)}
              </p>
            </div>

            {/* Coupon Code */}
            <div className="py-4 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Coupon Code</p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm hover:bg-gray-300"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p className="mt-2 text-sm text-red-600">{couponError}</p>
              )}
              {couponSuccess && (
                <p className="mt-2 text-sm text-green-600">{couponSuccess}</p>
              )}

              {discount > 0 && (
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-600">Discount</p>
                  <p className="text-sm font-medium text-green-600">
                    -{formatCurrency(discount)}
                  </p>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between py-4">
              <p className="text-base font-medium text-gray-900">Total</p>
              <p className="text-base font-bold text-gray-900">
                {formatCurrency(total)}
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg flex justify-center items-center font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isCheckingOut ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" /> Proceed to Checkout
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
