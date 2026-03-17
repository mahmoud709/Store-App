import  { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { Edit } from 'lucide-react';
import Orders from './Orders';
import useOrders from '../../hooks/useOrders';
import { Link } from 'react-router-dom';

const ProfileInfo = () => {
   const { userData } = useContext(AuthContext);
   const user = userData?.data;
   const { data: ordersData, isLoading: ordersLoading } = useOrders();
   const recentOrders = ordersData?.data?.data ?? [];
   return (
      <div  >
         <h1 className="text-2xl font-bold text-gray-900 mb-8">My Account</h1>

         {/* Welcome Card */}
         <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 flex items-center justify-between">
            <div>
               <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Hello, {user?.name || 'there'}
               </h2>
               <p className="text-sm text-gray-600">
                  Welcome back to your account dashboard.
               </p>
            </div>
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
               {
                  user?.image?.url !== 'null'
                  ? <img src={user?.image?.url} alt={user?.name} className="w-full h-full object-cover rounded-full" />
                  : <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                     <span className="text-xl font-semibold text-blue-600">
                        {user?.name?.charAt(0).toUpperCase()}
                     </span>
                  </div>
               }
            </div>
         </div>
         {/* Recent Orders */}
         <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
               <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
               <Link to="orders" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View all
               </Link>
            </div>

            <div className="overflow-x-auto">
               {ordersLoading ? (
                  <div className="flex justify-center py-10">
                     <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
               ) : recentOrders.length === 0 ? (
                  <div className="text-center py-10 text-sm text-gray-400">No orders yet</div>
               ) : (
                  <table className="w-full">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                           <th className="px-6 py-3"></th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                           <tr key={order._id} className="hover:bg-gray-50">

                              {/* Order ID */}
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                 #{order._id.slice(-6).toUpperCase()}
                              </td>

                              {/* Items */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex -space-x-2">
                                    {order.cartItems.slice(0, 3).map((item) => (
                                       item.product ? (
                                          <img
                                             key={item._id}
                                             src={item.product.imageCover}
                                             alt={item.product.title}
                                             className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                          />
                                       ) : (
                                          <div key={item._id} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                                             <Package className="w-3 h-3 text-gray-400" />
                                          </div>
                                       )
                                    ))}
                                    {order.cartItems.length > 3 && (
                                       <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                          +{order.cartItems.length - 3}
                                       </div>
                                    )}
                                 </div>
                              </td>

                              {/* Date */}
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                 {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'short', day: 'numeric'
                                 })}
                              </td>

                              {/* Payment method */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <span className="text-xs font-medium capitalize text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                    {order.PaymentMethodType}
                                 </span>
                              </td>

                              {/* Status */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isDelivered
                                       ? 'bg-green-100 text-green-800'
                                       : order.isPaid
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Processing'}
                                 </span>
                              </td>

                              {/* Total */}
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                 {order.totalOrderPrice.toLocaleString()} EGP
                              </td>

                              {/* View */}
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                 <Link
                                    to="orders"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                 >
                                    View
                                 </Link>
                              </td>

                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
            </div>
         </div>

         {/* Profile Information and Default Address */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-gray-900">Profile Information</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                     <Edit size={18} />
                  </button>
               </div>

               <div className="space-y-4">
                  <div>
                     <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                     <p className="text-sm text-gray-900">{user?.name || '—'}</p>
                  </div>
                  <div>
                     <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                     <p className="text-sm text-gray-900">{user?.email || '—'}</p>
                  </div>
                  <div>
                     <label className="block text-xs font-medium text-gray-500 mb-1">Member since</label>
                     <p className="text-sm text-gray-900">
                        {user?.createdAt ? new Date(user?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' }) : '-'}
                     </p>
                  </div>
               </div>
            </div>

            {/* Default Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-gray-900">Default Address</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                     <Edit size={18} />
                  </button>
               </div>

               <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                     Shipping Address
                  </label>
                  <p className="text-sm text-gray-900 leading-relaxed">
                     123 Design Street, Suite 404<br />
                     San Francisco, CA 94107<br />
                     United States
                  </p>
               </div>
            </div>
         </div>
      </div >
   )
}

export default ProfileInfo