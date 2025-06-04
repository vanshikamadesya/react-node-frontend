import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { createProduct, updateProduct } from "../store/slices/productSlice";
import * as Label from "@radix-ui/react-label";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";
interface ProductFormProps {
  product?: Product | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onCancel }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.products);
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
  } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [productImage, setProductImage] = useState<File | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated && !user) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate, user]);

 
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
      });
      setProductImage(null);
    }
  }, [product]);


  if (authLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated || !user) {
    return null; // Will redirect due to the useEffect above
  }

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    if (productImage) {
      data.append("productImage", productImage);
    }

    try {
      if (product) {
        await dispatch(updateProduct({ id: product.id, data })).unwrap();
        navigate("/products");
      } else {
        if (!user?._id) {
          throw new Error("User ID not found");
        }
        await dispatch(createProduct({ userId: user._id, data })).unwrap();
        navigate("/products");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex justify-end items-center pr-24">
      <div className="w-[580px] bg-gray-100 rounded-lg p-16 shadow-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          {product ? "Edit Product" : "Create New Product"}
        </h2>

        {error && (
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
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label.Root
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </Label.Root>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label.Root
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </Label.Root>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label.Root
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price ($)
              </Label.Root>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label.Root
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Stock Quantity
              </Label.Root>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <Label.Root
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </Label.Root>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports">Sports</option>
              <option value="Toys">Toys</option>
              <option value="Beauty">Beauty</option>
              <option value="Health">Health</option>
              <option value="Automotive">Automotive</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <Label.Root
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </Label.Root>
            <input
              id="productImage"
              name="productImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading
                ? product
                  ? "Updating..."
                  : "Creating..."
                : product
                ? "Update Product"
                : "Create Product"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
