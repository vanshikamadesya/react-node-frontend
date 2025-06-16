import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto text-green-500" size={64} />
        <h1 className="text-2xl font-bold mt-4 text-gray-800">Payment Successful</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase! Your payment has been received.
        </p>

        <Link to="/" className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
