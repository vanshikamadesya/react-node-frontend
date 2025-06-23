import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hook";
import { clearError } from "../store/slices/authSlice";
import * as Label from "@radix-ui/react-label";
import * as Toast from "@radix-ui/react-toast";
import { useResetPasswordMutation } from "../services/authAPI";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null); // Clear local error on new submission
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    if (!token) {
      return;
    }
    dispatch(clearError());
    try {
      await resetPassword({ token, newPassword: password }).unwrap();
      setSuccess(true);
    } catch (err) {
      // error is handled by RTK Query
    }
  };

  return (
    <Toast.Provider>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[400px] bg-gray-100 rounded-lg p-12 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>

          {/* Display backend errors from RTK Query */}
          {error && (
            <Toast.Root open={!!error} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <Toast.Description>{(error as any)?.data?.message || "Failed to reset password."}</Toast.Description>
            </Toast.Root>
          )}

          {/* Display local password mismatch error */}
          {localError && (
            <Toast.Root open={!!localError} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <Toast.Description>{localError}</Toast.Description>
            </Toast.Root>
          )}

          {success ? (
            <div className="text-center space-y-4">
              <p className="text-green-600">Your password has been reset successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label.Root htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </Label.Root>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label.Root htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </Label.Root>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </Toast.Provider>
  );
};

export default ResetPassword; 