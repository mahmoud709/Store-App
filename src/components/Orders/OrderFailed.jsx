import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function OrderFailed() {
   const navigate = useNavigate();

   return (
      <div className="min-h-screen flex items-center justify-center px-4">
         <div className="max-w-md w-full text-center">

            <div className="flex justify-center mb-6">
               <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-500" />
               </div>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Order Failed!</h1>
            <p className="text-gray-500 text-sm mb-8">
               Something went wrong while placing your order. Please try again.
            </p>

            <div className="flex flex-col gap-3">
               <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-blue-700 cursor-pointer text-white py-3 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity"
               >
                  Try Again
               </button>
               <button
                  onClick={() => navigate('/')}
                  className="w-full border cursor-pointer border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
               >
                  Go Home
               </button>
            </div>

         </div>
      </div>
   );
}