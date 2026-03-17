import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import LodderSpinner from "../common/LoaderSpinnser/LodderSpinner";
import { useContext } from "react";
import { toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { Star, ShoppingCart, Package, Loader2 } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
   const { addToCart } = useContext(cartContext);
   const { requireAuth } = useContext(AuthContext);
   const { id } = useParams();

   const { data, isLoading } = useQuery({
      queryKey: ['product', id],
      queryFn: () => axios.get(`${apiUrl}/products/${id}`),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
   });

   const prodDetails = data?.data?.data;

   if (isLoading) return <LodderSpinner />;

   const hasDiscount = prodDetails?.priceAfterDiscount && prodDetails?.priceAfterDiscount < prodDetails?.price;
   const discountPercent = hasDiscount
      ? Math.round((1 - prodDetails.priceAfterDiscount / prodDetails.price) * 100)
      : null;
   const isLowStock = prodDetails?.quantity <= 5 && prodDetails?.quantity > 0;
   const isOutOfStock = prodDetails?.quantity === 0;
   const colors = prodDetails?.colors?.[0]?.split(',') ?? [];

   async function handleAddToCart(id) {
      if (!requireAuth()) return;
      try {
         await addToCart.mutateAsync(id);
         toast.success("Product added to cart successfully", {
            theme: "colored",
            position: "top-left",
            autoClose: 2000,
         });
      } catch {
         toast.error("Failed to add product to cart", {
            theme: "colored",
            position: "top-left",
            autoClose: 2000,
         });
      }
   }

   return (
      <div className="container mx-auto px-4 py-10 mt-16">
         <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* Image */}
            <div className="md:w-[40%] w-full relative">
               <img
                  src={prodDetails?.imageCover}
                  alt={prodDetails?.title}
                  className="w-full h-[450px] object-cover rounded-2xl"
               />
               {discountPercent && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-xl">
                     -{discountPercent}%
                  </span>
               )}
               {isLowStock && (
                  <span className="absolute top-3 right-3 bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-lg">
                     Only {prodDetails.quantity} left
                  </span>
               )}
            </div>

            {/* Details */}
            <div className="md:w-[60%] w-full">

               {/* Category */}
               <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full capitalize">
                  {prodDetails?.category?.name}
               </span>

               {/* Title */}
               <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-2">{prodDetails?.title}</h2>

               {/* Rating */}
               <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                     <span className="text-sm font-medium text-gray-700">
                        {prodDetails?.ratingAverage?.toFixed(1)}
                     </span>
                  </div>
                  <span className="text-sm text-gray-400">({prodDetails?.ratingQuantity} reviews)</span>
                  <span className="text-sm text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                     <Package className="w-4 h-4 text-gray-400" />
                     <span className="text-sm text-gray-400">{prodDetails?.sold} sold</span>
                  </div>
               </div>

               {/* Description */}
               <p className="text-gray-500 text-sm leading-relaxed mb-5">{prodDetails?.description}</p>

               {/* Colors */}
               {colors.length > 0 && (
                  <div className="mb-5">
                     <p className="text-sm font-medium text-gray-700 mb-2">Available colors</p>
                     <div className="flex items-center gap-3 flex-wrap">
                        {colors.map((color) => (
                           <div key={color.trim()} className="flex items-center gap-1.5">
                              <div
                                 className="w-5 h-5 rounded-full border border-gray-300"
                                 style={{ backgroundColor: color.trim() }}
                              />
                              <span className="text-xs text-gray-500 capitalize">{color.trim()}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Price */}
               <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                     {hasDiscount ? prodDetails.priceAfterDiscount : prodDetails?.price} EGP
                  </span>
                  {hasDiscount && (
                     <span className="text-lg text-gray-400 line-through">{prodDetails.price} EGP</span>
                  )}
               </div>

               {/* Add to Cart */}
               <button
                  disabled={addToCart.isPending && addToCart.variables === prodDetails?._id || isOutOfStock}
                  onClick={() => handleAddToCart(prodDetails._id)}
                  className="w-full bg-black text-white py-3 rounded-xl cursor-pointer hover:opacity-80 disabled:opacity-60 flex items-center justify-center gap-2 text-sm font-medium"
               >
                  {isOutOfStock ? 'Out of Stock' :
                     addToCart.isPending && addToCart.variables === prodDetails?._id ? (
                        <>
                           <Loader2 className="w-4 h-4 animate-spin" />

                           Adding...
                        </>
                     ) : (
                        <>
                           <ShoppingCart className="w-4 h-4" />
                           Add to Cart
                        </>
                     )
                  }
               </button>

            </div>
         </div>
      </div>
   );
};

export default ProductDetails;