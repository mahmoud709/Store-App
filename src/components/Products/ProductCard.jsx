import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { LoaderCircle, Star } from "lucide-react";

const ProductCard = ({ pro }) => {
   const { addToCart } = useContext(cartContext);

   async function handleAddProduct(id) {
      try {
         await addToCart.mutateAsync(id);
      } catch {
         console.log("Failed to add product");
      }
   }

   const isLoading = addToCart.isPending && addToCart.variables === pro?.id;
   const hasDiscount = pro?.priceAfterDiscount && pro?.priceAfterDiscount < pro?.price;
   const isLowStock = pro?.quantity <= 6 && pro?.quantity > 0;
   const isOutOfStock = pro?.quantity === 0;

   return (
      <div className='max-w-sm mx-auto rounded-2xl shadow-sm border border-gray-100 p-4 bg-white hover:shadow-md transition-shadow'>

         <Link to={`/products/${pro?.id}`}>

            {/* Image */}
            <div className='relative'>
               <img
                  src={pro?.imageCover}
                  alt={pro?.title}
                  className='w-full object-cover h-64 rounded-xl'
               />
               {/* Discount badge */}
               {hasDiscount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                     -{Math.round((1 - pro.priceAfterDiscount / pro.price) * 100)}%
                  </span>
               )}
               {/* Stock badge */}
               {isLowStock && (
                  <span className="absolute top-2 right-2 bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-lg">
                     Only {pro.quantity} left
                  </span>
               )}
            </div>

            {/* Category */}
            <p className='capitalize text-gray-400 text-xs pt-3'>{pro?.category?.name}</p>

            {/* Title */}
            <h2 className='text-base font-semibold text-gray-800 line-clamp-1 mt-0.5'>{pro?.title}</h2>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{pro?.description}</p>

            {/* Colors */}
            {pro?.colors?.length > 0 && (
               <div className="flex items-center gap-1.5 mt-2">
                  {pro.colors[0].split(',').map((color) => (
                     <div
                        key={color.trim()}
                        title={color.trim()}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.trim() }}
                     />
                  ))}
               </div>
            )}

            {/* Rating + Price */}
            <div className='flex justify-between items-center mt-3'>
               <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-700">{pro?.ratingAverage?.toFixed(1)}</span>
                  <span className="text-xs text-gray-400">({pro?.ratingQuantity})</span>
               </div>

               <div className="flex items-center gap-2">
                  {hasDiscount && (
                     <span className="text-xs text-gray-400 line-through">{pro.price} EGP</span>
                  )}
                  <span className='text-sm font-bold text-green-600'>
                     {hasDiscount ? pro.priceAfterDiscount : pro.price} EGP
                  </span>
               </div>
            </div>

         </Link>

         {/* Add to Cart Button */}
         <button
            disabled={isLoading || isOutOfStock}
            onClick={() => handleAddProduct(pro?.id)}
            className="mt-4 w-full bg-black text-white py-2 rounded-xl cursor-pointer hover:opacity-80 disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
         >
            {isOutOfStock ? 'Out of Stock' : isLoading ? (
               <>
                  Adding...
                  <LoaderCircle className="w-4 h-4 animate-spin" />
               </>
            ) : 'Add to Cart'}
         </button>

      </div>
   );
};

export default ProductCard;