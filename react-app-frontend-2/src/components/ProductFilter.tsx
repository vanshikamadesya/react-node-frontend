import React from "react";
import { PRODUCT_CATEGORIES } from "../constants/categories";

interface ProductFilterProps {
  category: string;
  setCategory: (value: string) => void;
  minPrice?: number;
  setMinPrice: (value: number | undefined) => void;
  maxPrice?: number;
  setMaxPrice: (value: number | undefined) => void;
  inStock?: "in" | "out";
  setInStock: (value: "in" | "out" | undefined) => void;
  onClearFilters: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  inStock,
  setInStock,
  onClearFilters,
}) => {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>
      <div className="space-y-4 text-base text-gray-700">
        {/* Stock Filter */}
        <div className="space-y-2">
          <label className="block">Stock</label>
          <select
            value={inStock ?? ""}
            onChange={(e) =>
              setInStock(
                e.target.value === "" ? undefined : (e.target.value as "in" | "out")
              )
            }
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">All</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={(e) =>
                setMinPrice(e.target.value ? +e.target.value : undefined)
              }
              className="w-1/2 px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={(e) =>
                setMaxPrice(e.target.value ? +e.target.value : undefined)
              }
              className="w-1/2 px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="font-semibold mb-2">Category</h3>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a category</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="pt-4">
          <button
            onClick={onClearFilters}
            className="w-full text-center py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-blue-500"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilter;
