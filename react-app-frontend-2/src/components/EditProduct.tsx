import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../services/productAPI';
import ProductForm from '../components/ProductForm';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetSingleProductQuery(id || "");
  const product = data?.product;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{(error as any)?.data?.message || "Failed to load product"}</div>;
  }

  return (
    <ProductForm
      product={product}
    />
  );
};

export default EditProduct;