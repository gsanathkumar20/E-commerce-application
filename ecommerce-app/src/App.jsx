import { Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { useState } from "react";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header openCart={() => setIsCartOpen(true)} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <CartDrawer
          isOpen={isCartOpen}
          closeCart={() => setIsCartOpen(false)}
        />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
