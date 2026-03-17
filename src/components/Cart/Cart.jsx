import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { Lock, ShoppingBag, Trash, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { productsInCart, cartData, numOfCartItems, totalPrice, removeProductAtCart, updateQuantity } = useContext(cartContext);

  if (!productsInCart) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (productsInCart.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 min-h-screen text-gray-400">
      <ShoppingBag className='w-18 h-18 ' />

      <p className="text-lg font-medium text-gray-600">Your cart is empty</p>
      <p className="text-sm">Add some products to get started</p>
    </div>
  );

  const tax = +(totalPrice * 0.05).toFixed(2);
  const total = +(totalPrice + tax).toFixed(2);

  function handleUpdateQuantity(id, count) {
    updateQuantity.mutateAsync({ productId: id, quantity: count })
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 ">

      {/* Header */}
      <div className="flex items-baseline gap-3 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Shopping cart</h1>
        <span className="text-sm text-gray-400">{numOfCartItems} items</span>
      </div>

      {/* Free shipping banner */}
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-xl mb-6">
        <Truck className="w-4 h-4 shrink-0" />
        You've qualified for free shipping!
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

        {/* Cart Items */}
        <div className="flex flex-col gap-3">
          {productsInCart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 transition-colors">
              {/* Image */}
              <div className="w-20 h-24 rounded-xl shrink-0 overflow-hidden bg-gray-50">
                <img
                  src={item.product?.imageCover}
                  alt={item.product?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="text-lg font-medium text-gray-800 truncate">
                      {item.product?.title}
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {item.product?.category?.name}
                    </p>


                    {item.color && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div
                          className="w-3 h-3 rounded-full border border-gray-200"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-400">Color: {item.color}</span>
                      </div>
                    )}

                    {/* Price badge */}
                    <div className="inline-flex items-center gap-2 mt-2 bg-gray-50 rounded-md px-2 py-1">
                      {item.product.priceAfterDiscount < item.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {item.price} EGP
                        </span>
                      )}
                      <span className="text-xs font-medium text-green-600">
                        {item.product.priceAfterDiscount ?? item.product.price} EGP
                      </span>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {((item.product.priceAfterDiscount ?? item.product.price) * item.quantity).toFixed(2)} EGP
                  </span>
                </div>

                {/* Qty + Remove */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button disabled={updateQuantity.isPending} onClick={() => handleUpdateQuantity(item?._id, item?.quantity - 1)} className="w-7 h-7 cursor-pointer flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">−</button>
                    <span className="text-sm font-medium text-gray-800 w-4 text-center">{item.quantity}</span>
                    <button disabled={updateQuantity.isPending} onClick={() => handleUpdateQuantity(item?._id, item?.quantity + 1)} className="w-7 h-7 flex cursor-pointer items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">+</button>
                  </div>
                  <button disabled={removeProductAtCart.isPending} onClick={() => removeProductAtCart.mutateAsync(item._id)} className="cursor-pointer flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg transition-all">
                    <Trash className="w-3 h-3" />
                    Remove
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-800">Order summary</h2>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-gray-700">{totalPrice.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tax (5%)</span>
              <span className="text-gray-700">{tax.toFixed(2)} EGP</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800">Total</span>
            <span className="text-lg font-semibold text-gray-900">{total.toFixed(2)} EGP</span>
          </div>

          <Link to={`${cartData?._id}/create-order`}>
            <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl text-sm transition-colors">
              Proceed to checkout
            </button>
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <Lock className="w-3 h-3" />
            Secure checkout
          </div>

          {/* Payment badges */}
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-400 mb-2">We accept</p>
            <div className="flex gap-2 flex-wrap">
              {['VISA', 'Mastercard', 'PayPal'].map((p) => (
                <span key={p} className="border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-500 font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}