import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

function CategoryFilter({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === currentCategory) {
      // If clicking the current category, remove the filter
      searchParams.delete("category");
    } else {
      // Otherwise, set the new category
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);

    // On mobile, close the filter after selection
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const clearFilters = () => {
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-6">
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow"
        >
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-gray-500" />
            <span className="font-medium">
              {currentCategory
                ? `Category: ${
                    categories.find((c) => c.id === currentCategory)?.name ||
                    "All"
                  }`
                : "Filter by Category"}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {isOpen && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-3 py-2 text-sm rounded-full transition-colors ${
                    currentCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}

              {currentCategory && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-sm text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                currentCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}

          {currentCategory && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
