import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { createProduct, updateProduct } from "../store/slices/productSlice";
import * as Label from "@radix-ui/react-label";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { PRODUCT_CATEGORIES } from "../constants/categories";

// 🛡️ Dynamic Schema Generator
const createProductSchema = (isEdit: boolean) =>
  z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z
      .string().min(1, "Price is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Price must be a non-negative number",
      }),
    stock: z
      .string()
      .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 0, {
        message: "Stock must be a non-negative integer",
      }),
    category: z.string().min(1, "Category is required"),
    productImage: isEdit
      ? z.any().optional()
      : z
          .any()
          .refine((file) => file?.length === 1, {
            message: "Product image is required",
          }),
  });

type ProductFormData = z.infer<ReturnType<typeof createProductSchema>>;

const ProductForm: React.FC<{ product?: Product | null }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.products);
  const { user, isAuthenticated, isLoading: authLoading } = useAppSelector(
    (state) => state.auth
  );

  const isEdit = !!product;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(createProductSchema(isEdit)),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated && !user) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  useEffect(() => {
    if (product) {
      setValue("name", product.name ?? "");
      setValue("description", product.description ?? "");
      setValue("price", product.price?.toString() ?? "");
      setValue("stock", product.stock?.toString() ?? "");
      setValue("category", product.category ?? "");
    }
  }, [product, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      if (data.productImage && data.productImage.length > 0) {
        formData.append("productImage", data.productImage[0]);
      }

      if (product) {
        await dispatch(updateProduct({ id: product.id, data: formData })).unwrap();
      } else {
        if (!user?._id) throw new Error("User ID not found");
        await dispatch(createProduct({ userId: user._id, data: formData })).unwrap();
      }

      navigate("/products");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  if (authLoading) return <div>Loading...</div>;
  if (!isAuthenticated || !user) return null;

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
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                      OK
                    </button>
                  </AlertDialog.Cancel>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label.Root htmlFor="name" className="block mb-1 text-sm font-medium">
              Product Name
            </Label.Root>
            <input
              id="name"
              {...register("name")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <Label.Root htmlFor="description" className="block mb-1 text-sm font-medium">
              Description
            </Label.Root>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            < div>
              <Label.Root htmlFor="price" className="block mb-1 text-sm font-medium">
                Price ($)
              </Label.Root>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price")}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>

            <div>
              <Label.Root htmlFor="stock" className="block mb-1 text-sm font-medium">
                Stock Quantity
              </Label.Root>
              <input
                id="stock"
                type="number"
                min="0"
                {...register("stock")}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <Label.Root htmlFor="category" className="block mb-1 text-sm font-medium">
              Category
            </Label.Root>
            <select
              id="category"
              {...register("category")}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a category</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <Label.Root htmlFor="productImage" className="block mb-1 text-sm font-medium">
              Product Image
            </Label.Root>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              {...register("productImage")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.productImage && (
              <p className="text-sm text-red-500">{errors.productImage.message as string}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading
                ? product
                  ? "Updating..."
                  : "Creating..."
                : product
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
