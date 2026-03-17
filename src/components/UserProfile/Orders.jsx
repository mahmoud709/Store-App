import { useEffect } from "react";
import useOrders from "../../hooks/useOrders";
import LodderSpinner from "../common/LoaderSpinnser/LodderSpinner";
import { Package, MapPin, Phone, Building2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function Orders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useOrders();
  const orders = data?.data?.data ?? [];


  useEffect(() => {
    // Stripe adds ?session_id=... to success_url
    // we use it to detect a fresh redirect from Stripe
    const isFromStripe = searchParams.get('session_id');

    if (isFromStripe) {
      queryClient.invalidateQueries({ queryKey: ['usercart'] });
    }
  }, []);
  

  if (isLoading) return <LodderSpinner />;

  if (orders.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
      <Package className="w-16 h-16" />
      <p className="text-lg font-medium text-gray-600">No orders yet</p>
      <p className="text-sm">Your orders will appear here</p>
    </div>
  );
  return (
    <div className="px-4 py-8">

      <div className="flex items-baseline gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
        <span className="text-sm text-gray-400">{orders.length} orders</span>
      </div>

      <div className="grid lg:grid-cols3 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">

            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center">
                  <Package className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Payment status */}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.isPaid
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {order.isPaid ? 'Paid' : 'Unpaid'}
                </span>
                {/* Delivery status */}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.isDelivered
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
                  }`}>
                  {order.isDelivered ? 'Delivered' : 'Processing'}
                </span>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-3 mb-4">
              {order.cartItems.map((item) => (
                item.product ? (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.product.title}</p>
                      <p className="text-xs text-gray-400">{item.product.category?.name}</p>
                      {item.color && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="w-2.5 h-2.5 rounded-full border border-gray-200" style={{ backgroundColor: item.color }} />
                          <span className="text-xs text-gray-400">{item.color}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-gray-800">{item.price.toLocaleString()} EGP</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ) : (
                  <div key={item._id} className="flex items-center gap-3 text-gray-400">
                    <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5" />
                    </div>
                    <p className="text-sm">Product no longer available</p>
                    <p className="text-sm font-semibold text-gray-800 ml-auto">{item.price.toLocaleString()} EGP</p>
                  </div>
                )
              ))}
            </div>

            {/* Shipping + Total */}
            <div className="border-t border-gray-100 pt-4 flex flex-col md:flex-row justify-between gap-3">

              {/* Shipping Address */}
              <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{order.shippingAddress.details}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-gray-400" />
                  <span>{order.shippingAddress.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex flex-col items-end justify-end gap-1">
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-lg font-semibold text-gray-900">
                  {order.totalOrderPrice.toLocaleString()} EGP
                </p>
                <p className="text-xs text-gray-400 capitalize">{order.PaymentMethodType}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}