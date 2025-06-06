import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";
import { useAppDispatch } from "../store/hook";
import { forgotPassword } from "../store/slices/authSlice";

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Implement password reset request
      await dispatch(forgotPassword(email)).unwrap();
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Toast.Provider>
      <div className="min-h-screen flex justify-end items-center pr-24">
        <div className="w-[400px] h-[400px] bg-gray-100 rounded-lg p-12 shadow-lg mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">Reset Password</h2>

          {error && (
            <Toast.Root className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <Toast.Description>{error}</Toast.Description>
            </Toast.Root>
          )}

          {success ? (
            <div className="text-center space-y-6">
              <p className="text-green-600">
                Password reset instructions have been sent to your email.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
               
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Toast.Provider>
  );
};

export default ForgetPassword;