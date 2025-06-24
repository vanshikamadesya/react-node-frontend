import React, { useState, useMemo } from "react";
import { useAppSelector } from "../store/hook";
import {
  useSearchProductsQuery,
  useDeleteProductMutation,
} from "../services/productAPI";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import type { Product } from "../types";
import { useNavigate, useLocation } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../constants/categories";
import DeleteProductDialog from "./DeleteProductDialog";
import ProductFilter from "./ProductFilter";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const searchTerm = new URLSearchParams(location.search).get("search") || "";

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [inStock, setInStock] = useState<"in" | "out" | undefined>(undefined);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};

    if (searchTerm) params.search = searchTerm;
    if (minPrice !== undefined) params.minPrice = String(minPrice);
    if (maxPrice !== undefined) params.maxPrice = String(maxPrice);
    if (category) params.category = category;
    if (inStock) params.stock = inStock;

    return params;
  }, [searchTerm, minPrice, maxPrice, category, inStock]);

  const { data, isLoading, error, refetch } =
    useSearchProductsQuery(queryParams);

  const [deleteProduct] = useDeleteProductMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredProducts: Product[] = data?.data?.products || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      await refetch();
      setDeleteId(null);
    } catch (error) {
      console.log("Failed to delete products:", error);
    }
  };

  const handlePay = (productId: string) => {
    if (!isAuthenticated) {
      alert("Please log in to make a payment.");
      navigate("/login");
      return;
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
              {(error as any)?.data?.message || "Failed to load products"}
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

  return (
    <div className="mt-12 py-8 flex flex-col lg:flex-row gap-8">
      <ProductFilter
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        inStock={inStock}
        setInStock={setInStock}
        onClearFilters={() => {
          setCategory("");
          setMinPrice(undefined);
          setMaxPrice(undefined);
          setInStock(undefined);
        }}
      />

      {/* Product Grid */}
      <div className="flex-1">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No products found.</p>
            <p className="text-gray-400">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
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
                      src={`${import.meta.env.VITE_API_URL}/ImageUploads/${product.productImage.replace('upload/', '')}`}
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
                        onClick={() => navigate(`/edit-product/${product._id}`)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <DeleteProductDialog
                        open={deleteId === product._id}
                        onOpenChange={(open) =>
                          setDeleteId(open ? product._id : null)
                        }
                        onDelete={() => handleDelete(product._id)}
                      />
                      <button
                        onClick={() => setDeleteId(product._id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handlePay(product._id)}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
