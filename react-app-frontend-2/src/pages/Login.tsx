import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { loginUser, clearError } from "../store/slices/authSlice";
import * as Label from "@radix-ui/react-label";
import * as Toast from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Toast.Provider>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[450px] bg-gray-100 rounded-lg p-16 shadow-lg ">
          <h2 className="text-2xl font-bold text-center mb-6 bg-red">Login</h2>

          {error && (
            <Toast.Root className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <Toast.Description>{error}</Toast.Description>
            </Toast.Root>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label.Root
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </Label.Root>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label.Root
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </Label.Root>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="text-left mt-3">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </Toast.Provider>
  );
};

export default Login;
