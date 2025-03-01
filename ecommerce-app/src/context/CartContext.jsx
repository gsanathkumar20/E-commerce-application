import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      // Load cart from localStorage on initial render
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1, selectedSize, selectedColor) => {
    if (!product || !product.id) {
      console.error("Invalid product", product);
      return;
    }

    setCart((prevCart) => {
      // Check if the product with the same size and color already exists in the cart
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // If the item doesn't exist, add it to cart
        return [
          ...prevCart,
          {
            ...product,
            quantity,
            selectedSize,
            selectedColor,
          },
        ];
      }
    });

    // Open the cart drawer when an item is added
    setIsCartOpen(true);
  };

  // Remove item from cart
  const removeFromCart = (itemId, selectedSize, selectedColor) => {
    console.log("removeFromCart called with:", {
      itemId,
      selectedSize,
      selectedColor,
    });

    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => {
        const shouldKeep = !(
          item.id === itemId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        );

        return shouldKeep;
      });

      console.log(
        "Old cart length:",
        prevCart.length,
        "New cart length:",
        newCart.length
      );
      return newCart;
    });
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity, selectedSize, selectedColor) => {
    if (!itemId || quantity <= 0) {
      console.error("Invalid update parameters", { itemId, quantity });
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart total
  const getCartTotal = () => {
    if (!cart || cart.length === 0) return 0;

    return cart.reduce((total, item) => {
      if (!item) return total;
      const price =
        item.discountPrice !== null && item.discountPrice !== undefined
          ? item.discountPrice
          : item.price || 0;
      return total + price * (item.quantity || 1);
    }, 0);
  };

  // Get total number of items in cart
  const getCartItemCount = () => {
    if (!cart || cart.length === 0) return 0;

    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Cart drawer control
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isCartOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
