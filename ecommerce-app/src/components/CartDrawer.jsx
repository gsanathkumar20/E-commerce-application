import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartDrawer({ isOpen }) {
  const {
    cart = [],
    removeFromCart,
    getCartTotal,
    closeCart,
    updateQuantity,
  } = useCart();

  // Add a defensive check to prevent the error
  const subtotal = cart ? getCartTotal() : 0;

  // If the cart is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm  bg-opacity-5 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="px-4 py-6 bg-gray-50 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Shopping Cart
                </h2>
                <button
                  onClick={closeCart}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Cart contents */}
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              {!cart || cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Start shopping to add items to your cart
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={closeCart}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => {
                    // Create a unique key for each cart item
                    const itemKey = `${item.id}-${
                      item.selectedSize || "default"
                    }-${item.selectedColor || "default"}`;

                    // Handle image safely
                    const imageUrl =
                      item.images && item.images.length > 0
                        ? typeof item.images[0] === "string"
                          ? item.images[0]
                          : "/api/placeholder/100/100"
                        : "/api/placeholder/100/100";

                    return (
                      <li key={itemKey} className="py-6 flex">
                        {/* Product image */}
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>

                        {/* Product details */}
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link
                                  to={`/product/${item.id}`}
                                  onClick={closeCart}
                                >
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                ${(item.discountPrice || item.price).toFixed(2)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.selectedColor &&
                                `Color: ${item.selectedColor}`}
                              {item.selectedSize && item.selectedColor && " | "}
                              {item.selectedSize &&
                                `Size: ${item.selectedSize}`}
                            </p>
                          </div>

                          <div className="flex-1 flex items-end justify-between text-sm">
                            {/* Quantity selector */}
                            <div className="flex items-center">
                              <span className="mr-2 text-gray-500">Qty:</span>
                              <select
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    parseInt(e.target.value, 10),
                                    item.selectedSize,
                                    item.selectedColor
                                  )
                                }
                                className="border border-gray-300 rounded-md text-sm p-1"
                              >
                                {[...Array(10).keys()].map((num) => (
                                  <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => {
                                removeFromCart(
                                  item.id,
                                  item.selectedSize,
                                  item.selectedColor
                                );
                              }}
                              className="font-medium text-red-600 hover:text-red-500 flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer with totals and checkout button */}
            {cart && cart.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>₹{subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout-confirmation"
                    onClick={closeCart}
                    className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="text-blue-600 font-medium hover:text-blue-500"
                      onClick={closeCart}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
