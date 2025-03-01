import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  // Add defensive checks
  if (!products) {
    console.error("Products data is undefined or null");
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-700">Data error</h3>
        <p className="text-gray-500 mt-2">
          There was a problem loading the products
        </p>
      </div>
    );
  }

  if (!Array.isArray(products)) {
    console.error("Products is not an array:", products);
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-700">Data format error</h3>
        <p className="text-gray-500 mt-2">
          The product data is not in the expected format
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-700">No products found</h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        // Skip invalid products
        if (!product || !product.id) {
          console.warn("Invalid product found in the products array:", product);
          return null;
        }
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductGrid;
