import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {  clearError, registerUser } from "../store/slices/authSlice";
import * as Label from "@radix-ui/react-label";
import * as Toast from "@radix-ui/react-toast";
// import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { authApi } from "../services/authAPI";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
//   const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    type: "BUYER" as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    
    try {
      const resultAction = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[450px] bg-gray-100 rounded-lg p-16 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {error && (
          <Toast.Root className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <Toast.Description>{error}</Toast.Description>
          </Toast.Root>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label.Root
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </Label.Root>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Login here
            </button>
          </p>
        </div>

        {/* <AlertDialog.Root
          open={showPasswordMismatch}
          onOpenChange={setShowPasswordMismatch}
        >
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <AlertDialog.Title className="text-lg font-semibold mb-2">
                Password Mismatch
              </AlertDialog.Title>
              <AlertDialog.Description className="text-gray-600 mb-4">
                The passwords you entered do not match. Please try again.
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
        </AlertDialog.Root> */}
      </div>
    </div>
  );
};

export default RegisterForm;
