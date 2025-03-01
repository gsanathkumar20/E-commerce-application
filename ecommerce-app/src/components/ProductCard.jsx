import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { Star } from "lucide-react";

function ProductCard({ product }) {
  const {
    id,
    name,
    price,
    discountPrice,
    rating,
    reviewCount,
    images,
    category,
  } = product;

  // Make sure images exists and has items before trying to access
  const imageUrl =
    images && images.length > 0
      ? typeof images[0] === "string"
        ? images[0]
        : "/api/placeholder/400/320"
      : "/api/placeholder/400/320";

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {discountPrice && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded px-2 py-1">
              {Math.round(((price - discountPrice) / price) * 100)}% OFF
            </span>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded px-2 py-1 capitalize">
              {category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600">
            {name}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {rating}
              </span>
            </div>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-sm text-gray-500">{reviewCount} reviews</span>
          </div>

          <div className="flex items-center">
            {discountPrice ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(discountPrice)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {formatCurrency(price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
