import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchProducts, deleteProduct } from "../store/slices/productSlice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import type { Product } from "../types";

interface ProductListProps {
  onEditProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEditProduct }) => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
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

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No products found.</p>
        <p className="text-gray-400">Start by adding your first product!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      {/* Filter Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>
        {/* You can insert filter controls here */}
        <div className="space-y-4 text-base text-gray-700">
          <div className="flex items-center">
            <input type="checkbox" id="inStock" className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="inStock">In Stock</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="outOfStock" className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="outOfStock">Out of Stock</label>
          </div>
          {/* Add category dropdowns, sliders, etc. */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Price Range</h3>
            {/* Price range inputs/slider here */}
            <div className="flex items-center space-x-3">
              <input type="number" placeholder="Min" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span>-</span>
              <input type="number" placeholder="Max" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Category</h3>
             {/* Category dropdown here */}
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
               <option value="">All Categories</option>
               {/* Map through categories from state/API */}
             </select>
          </div>
        </div>
      </aside>
  
      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
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
  
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
  
                <p className="text-gray-600 mb-4">{product.description}</p>
  
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-600">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {product.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock} units
                  </p>
                </div>
              </div>
  
              <div className="p-6 bg-gray-50 border-t border-gray-200 flex space-x-2">
                <button
                  onClick={() => onEditProduct(product)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Edit
                </button>
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
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
                        Are you sure you want to delete this product? This action
                        cannot be undone.
                      </AlertDialog.Description>
                      <div className="flex justify-end space-x-2">
                        <AlertDialog.Cancel asChild>
                          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Cancel
                          </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default ProductList;
