import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import { Sliders, X } from "lucide-react";
// Import data from the data.js file with the correct variable names
import { products, categories } from "../items/data.js";

function HomePage() {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const categoryParam = searchParams.get("category");

  useEffect(() => {
    // Load data from the imported variables
    const loadProducts = async () => {
      try {
        setLoading(true);

        // Check if products and categories are properly imported
        if (!products || !Array.isArray(products)) {
          throw new Error(
            "Products data is not available or not in the correct format"
          );
        }

        if (!categories || !Array.isArray(categories)) {
          throw new Error(
            "Categories data is not available or not in the correct format"
          );
        }

        // Filter products if a category is selected
        const filteredProducts = categoryParam
          ? products.filter((product) => product.category === categoryParam)
          : products;

        setDisplayProducts(filteredProducts);
        setDisplayCategories(categories);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(`Failed to load products: ${err.message}`);
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryParam]);

  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-red-600 mb-2">Error</h3>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mb-8 p-8 md:p-12 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Find Your Perfect Pair
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Discover our wide selection of quality footwear for every occasion and
          style preference.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar for filters on desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <CategoryFilter categories={displayCategories} />
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleFilters}
            className="flex items-center justify-center w-full px-4 py-2 bg-white rounded-lg shadow border"
          >
            <Sliders className="w-4 h-4 mr-2" />
            <span>Filters</span>
          </button>

          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50  backdrop-blur-sm  bg-opacity-5 transition-opacity flex justify-end">
              <div className="bg-white w-3/4 h-full p-4 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <button onClick={toggleFilters}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <CategoryFilter categories={displayCategories} />
              </div>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="flex-1">
          <ProductGrid products={displayProducts} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
