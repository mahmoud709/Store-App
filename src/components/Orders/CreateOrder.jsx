import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { MapPin, Phone, Building2, ShoppingBag, Loader2, Banknote, CreditCard } from "lucide-react";
import { validateMiddleEastPhone } from "../../validator/RegisterValidation";

const apiUrl = import.meta.env.VITE_API_URL;

const CreateOrder = () => {
   const { cartId } = useParams();
   const { totalPrice, numOfCartItems } = useContext(cartContext);
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   const token = localStorage.getItem('token');
   const [paymentMethod, setPaymentMethod] = useState('cash');

   const createCashOrder = useMutation({
      mutationFn: (values) =>
         axios.post(
            `${apiUrl}/orders/${cartId}`,
            { shippingAddress: values },
            { headers: { Authorization: `Bearer ${token} `} }
         ),
      onSuccess: () => {
         queryClient.removeQueries({ queryKey: ['usercart'] }); // ✅
         queryClient.invalidateQueries({ queryKey: ['orders'] });
         navigate('success');
      },
      onError: (err) => {
         toast.error(err.response?.data?.message || "Failed to place order",{position:'top-left'});
         navigate('failed');
      },
   
   });

   const createOnlineOrder = useMutation({
      mutationFn: (values) => { return axios.post(`${apiUrl}/orders/checkout-session/${cartId}`,
            { shippingAddress: values },
            { headers: { Authorization: `Bearer ${token} ` } }
         )},
      onSuccess: (res) => {
         queryClient.removeQueries({ queryKey: ['usercart'] }); // ✅
         queryClient.invalidateQueries({ queryKey: ['orders'] });
         window.location.href = res.data.session.url;
      },
      onError: (err) => {
         toast.error(err.response?.data?.message || "Failed to place order");
         navigate('failed');
      },
   });
   const formik = useFormik({
      initialValues: { details: '', phone: '', city: '' },
      validationSchema: yup.object().shape({
         details: yup.string().required('Address is required'),
         phone: yup
            .string()
            .required('Phone number is required')
            .test('is-valid-phone', 'Enter a valid Middle East phone number', validateMiddleEastPhone),
         city: yup.string().required('City is required'),
      }),
      onSubmit: async (values) => {
         try {
            if (paymentMethod === 'cash') {
               await createCashOrder.mutateAsync(values);
            } else {
               await createOnlineOrder.mutateAsync(values);
            }
         } catch {
            // handled in onError
         }
      },
   });

   const inputClass = (field) =>
      `w-full px-4 py-2.5 text-sm border rounded-xl outline-none transition-colors ${formik.errors[field] && formik.touched[field]
         ? 'border-red-400 bg-red-50'
         : 'border-gray-200 focus:border-gray-400'
      }`;

   const fields = [
      {
         id: 'details',
         label: 'Address Details',
         icon: MapPin,
         placeholder: 'Street, building, apartment...',
         type: 'text',
      },
      {
         id: 'phone',
         label: 'Phone Number',
         icon: Phone,
         placeholder: '01xxxxxxxxx',
         type: 'tel',
      },
      {
         id: 'city',
         label: 'City',
         icon: Building2,
         placeholder: 'Cairo, Alexandria...',
         type: 'text',
      },
   ];

   const isPending = createCashOrder.isPending || createOnlineOrder.isPending;

   return (
      <div className="max-w-2xl mx-auto px-4 py-10 mt-12">

         {/* Header */}
         <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
         </div>

         <div className="flex flex-col gap-6">

            {/* Order Summary */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
               <h2 className="text-sm font-semibold text-gray-700 mb-3">Order summary</h2>
               <div className="flex justify-between text-sm text-gray-500">
                  <span>Items</span>
                  <span>{numOfCartItems}</span>
               </div>
               <div className="flex justify-between text-sm font-semibold text-gray-800 mt-2 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{totalPrice?.toFixed(2)} EGP</span>
               </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
               <h2 className="text-sm font-semibold text-gray-700 mb-4">Payment method</h2>
               <div className="grid grid-cols-2 gap-3">
                  {[
                     { id: 'cash', label: 'Cash', sub: 'Pay on delivery', Icon: Banknote },
                     { id: 'online', label: 'Online', sub: 'Pay with Stripe', Icon: CreditCard },
                  ].map(({ id, label, sub, Icon }) => (
                     <button
                        disabled={id === 'online'}
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`flex flex-col gap-1.5 p-4 rounded-xl border text-left transition-all cursor-pointer ${paymentMethod === id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                           }`}
                     >
                        <Icon className={`w-5 h-5 ${paymentMethod === id ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className="text-sm font-medium">{label}</span>
                        <span className="text-xs opacity-70">{sub}</span>
                     </button>
                  ))}
               </div>
            </div>

            {/* Shipping Form */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
               <h2 className="text-sm font-semibold text-gray-700 mb-5">Shipping address</h2>

               <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                  {fields.map(({ id, label, icon: Icon, placeholder, type }) => (
                     <div key={id} className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                           <Icon className="w-4 h-4 text-gray-400" />
                           {label}
                        </label>
                        <input
                           id={id}
                           name={id}
                           type={type}
                           placeholder={placeholder}
                           value={formik.values[id]}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           className={inputClass(id)}
                        />
                        {formik.errors[id] && formik.touched[id] && (
                           <p className="text-xs text-red-500">{formik.errors[id]}</p>
                        )}
                     </div>
                  ))}

                  <button
                     type="submit"
                     disabled={isPending}
                     className={`w-full cursor-pointer text-white py-3 rounded-xl text-sm font-medium disabled:opacity-60 transition-all flex items-center justify-center gap-2 ${paymentMethod === 'online'
                           ? 'bg-violet-600 hover:bg-violet-700'
                           : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                  >
                     {isPending ? (
                        <>
                           <Loader2 className="w-4 h-4 animate-spin" />
                           {paymentMethod === 'online' ? 'Redirecting to Stripe...' : 'Placing order...'}
                        </>
                     ) : paymentMethod === 'online' ? 'Pay with Stripe' : 'Place Order'}
                  </button>
               </form>
            </div>

         </div>
      </div>
   );
};

export default CreateOrder;