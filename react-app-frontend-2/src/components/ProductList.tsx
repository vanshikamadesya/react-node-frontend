import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  fetchProducts,
  deleteProduct,
  fetchProduct,
} from "../store/slices/productSlice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import type { Product } from "../types";
import { useNavigate, useLocation } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../constants/categories";


const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [inStock, setInStock] = useState<"in" | "out" | "all">("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Extract search term from URL
  const searchTerm = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    handleApplyFilters(); // Apply filters when products or search term changes
  }, [products, searchTerm]); // Add searchTerm as a dependency

  const handleApplyFilters = () => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      console.log("Applying search filter with term:", searchTerm); // Debugging line
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    if (inStock === "in") {
      filtered = filtered.filter((product) => product.stock > 0);
    } else if (inStock === "out") {
      filtered = filtered.filter((product) => product.stock === 0);
    }

    console.log("Filtered products after all filters:", filtered); // Debugging line
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
  };

  const handlePay = async (productId: string) => {
    if (!isAuthenticated) {
      alert("Please log in to make a payment.");
      navigate("/login");
      return;
    }

    try {
      const product = await dispatch(fetchProduct(productId)).unwrap();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            amount: product.price,
            currency: "inr",
          }),
        }
      );

      const data = await response.json();

      if (!data.success)
        throw new Error(data.message || "Payment initiation failed");

      localStorage.setItem("clientSecret", data.clientSecret);
      localStorage.setItem("selectedProduct", JSON.stringify(product));

      navigate("/payment");
    } catch (error) {
      console.error("Failed to initiate payment:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <AlertDialog.Root open={!!error}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <AlertDialog.Title className="text-lg font-semibold text-red-600 mb-2">
              Error
            </AlertDialog.Title>
            <AlertDialog.Description className="text-gray-600 mb-4">
              {error}
            </AlertDialog.Description>
            <div className="flex justify-end">
              <AlertDialog.Cancel asChild>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  OK
                </button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No products found.</p>
        <p className="text-gray-400">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 py-8 flex flex-col lg:flex-row gap-8">
      {/* Filters */}
      <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>
        <div className="space-y-4 text-base text-gray-700">
          <div className="space-y-2">
            <label className="block">Stock</label>
            <select
              value={inStock}
              onChange={(e) =>
                setInStock(e.target.value as "in" | "out" | "all")
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="all">All</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

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

          <button
            onClick={handleApplyFilters}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {product.productImage && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${product.productImage}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}

                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {product.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200 flex space-x-2">
                {user?.type !== "BUYER" ? (
                  <>
                    <button
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild>
                        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                          Delete
                        </button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
                        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                          <AlertDialog.Title className="text-lg font-semibold mb-2">
                            Delete Product
                          </AlertDialog.Title>
                          <AlertDialog.Description className="text-gray-600 mb-4">
                            Are you sure you want to delete this product? This
                            action cannot be undone.
                          </AlertDialog.Description>
                          <div className="flex justify-end space-x-2">
                            <AlertDialog.Cancel asChild>
                              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                Cancel
                              </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
                  </>
                ) : (
                  <button
                    onClick={() => handlePay(product.id)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
