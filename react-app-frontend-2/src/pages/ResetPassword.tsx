import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { resetPassword, clearError } from "../store/slices/authSlice";
import * as Label from "@radix-ui/react-label";
import * as Toast from "@radix-ui/react-toast";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // You might want to set a local error state here
      console.error("Passwords do not match");
      return;
    }

    if (!token) {
        console.error("Reset token is missing");
        // Handle missing token - maybe navigate to an error page or back to forgot password
        return;
    }

    dispatch(clearError());
    try {
        const resultAction = await dispatch(resetPassword({ token, newPassword: password })).unwrap();
        // Assuming resetPassword thunk returns something on success
        setSuccess(true);
    } catch (err) {
        console.error("Failed to reset password:", err);
    }
  };

  return (
    <Toast.Provider>
      <div className="flex items-center justify-center">
        <div className="w-[400px] bg-gray-100 rounded-lg p-12 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>

          {error && (
            <Toast.Root className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <Toast.Description>{error}</Toast.Description>
            </Toast.Root>
          )}

          {success ? (
            <div className="text-center space-y-4">
              <p className="text-green-600">Your password has been reset successfully.</p>
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Return to Login
              </button>
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