import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  Star,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { products } from "../items/data"; // Import products from your data.js file

function ProductPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Find the product with matching id from your data.js
        const foundProduct = products.find((p) => p.id === parseInt(productId));

        if (!foundProduct) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        setProduct(foundProduct);
        // Set default color if available
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load product information. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // Validate selections
    if (!selectedSize) {
      setSizeError(true);
      return;
    } else {
      setSizeError(false);
    }

    if (!selectedColor) {
      setColorError(true);
      return;
    } else {
      setColorError(false);
    }

    // Add to cart
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-red-600 mb-2">Error</h3>
        <p className="text-gray-700">{error || "Product not found"}</p>
        <Link
          to="/"
          className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <Link
          to={`/?category=${product.category}`}
          className="text-gray-500 hover:text-gray-900 capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium truncate">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-20 h-20 border rounded-md overflow-hidden ${
                    activeImageIndex === index
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.discountPrice)}
                </span>
                <span className="ml-3 text-lg text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-medium">
                  Save {formatCurrency(product.price - product.discountPrice)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setColorError(false);
                  }}
                  className={`w-10 h-10 rounded-full ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-blue-500"
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      color.toLowerCase() === "white"
                        ? "#ffffff"
                        : color.toLowerCase() === "black"
                        ? "#000000"
                        : color.toLowerCase() === "gray"
                        ? "#808080"
                        : color.toLowerCase() === "red"
                        ? "#ff0000"
                        : color.toLowerCase() === "blue"
                        ? "#0000ff"
                        : color.toLowerCase() === "green"
                        ? "#008000"
                        : color.toLowerCase() === "yellow"
                        ? "#ffff00"
                        : color.toLowerCase() === "purple"
                        ? "#800080"
                        : color.toLowerCase() === "pink"
                        ? "#ffc0cb"
                        : color.toLowerCase() === "orange"
                        ? "#ffa500"
                        : color.toLowerCase() === "brown"
                        ? "#a52a2a"
                        : color.toLowerCase() === "navy"
                        ? "#000080"
                        : color.toLowerCase() === "tan"
                        ? "#d2b48c"
                        : color,
                  }}
                  aria-label={`Color: ${color}`}
                ></button>
              ))}
            </div>
            {colorError && (
              <p className="text-red-500 text-sm mt-1">Please select a color</p>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`flex items-center justify-center py-2 border rounded-md text-sm font-medium 
                    ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="text-red-500 text-sm mt-1">Please select a size</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="border border-gray-300 rounded-l-md p-2"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.min(10, Math.max(1, parseInt(e.target.value) || 1))
                  )
                }
                className="w-16 border-t border-b border-gray-300 p-2 text-center"
              />
              <button
                onClick={incrementQuantity}
                className="border border-gray-300 rounded-r-md p-2"
                disabled={quantity >= 10}
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="ml-3 text-sm text-gray-500">
                {product.stock} in stock
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mb-8">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {/* Product Features */}
          {product.features && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Features
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex space-x-6">
              <div className="flex items-start">
                <Truck className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    2-Year Warranty
                  </h4>
                  <p className="text-sm text-gray-500">100% guaranteed</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    30-Day Returns
                  </h4>
                  <p className="text-sm text-gray-500">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
