import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {

   return (
      <div className="min-h-screen flex items-center justify-center px-4">
         <div className="max-w-md w-full text-center">

            <div className="flex justify-center mb-6">
               <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
               </div>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Order Placed!</h1>
            <p className="text-gray-500 text-sm mb-8">
               Your order has been placed successfully. We'll process it shortly.
            </p>

            <div className="flex flex-col gap-3">
               <Link
                  to={'/profile/orders'}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity"
               >
                  View My Orders
               </Link>
               <Link
                  to={'/products'}
                  className="w-full cursor-pointer border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
               >
                  Continue Shopping
               </Link>
            </div>

         </div>
      </div>
   );
}