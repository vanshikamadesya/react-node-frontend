import React from "react";
import { useAppSelector } from "../store/hook";
import { useGetProductsQuery } from "../services/productAPI";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, error } = useGetProductsQuery("");
  const products = data?.products || [];

  if (isLoading) {
    return <div className="text-center py-8">Loading products data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error loading products: {(error as any)?.data?.message || "Failed to load products"}</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100 mt-20 w-full">
      {/* Sidebar */}
      <aside className="w-96 bg-white border-r border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">MyStore</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
          <a href="/products" className="block text-gray-700 hover:text-blue-600 font-medium">Products</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Orders</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.email || "User"}!</p>
        </header>

        {/* Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">Total Products</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{products.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">Total Sales</h3>
            <p className="mt-2 text-xl text-green-600">Sales data not available yet</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">Total Orders</h3>
            <p className="mt-2 text-xl text-purple-600">Order data not available yet</p>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            Recent activity data not available yet.
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
