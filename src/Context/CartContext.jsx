import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
import { AuthContext } from './AuthContext';
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
   const { requireAuth } = useContext(AuthContext)

   const queryClient = useQueryClient();
   const token = localStorage.getItem("token");

   const authHeaders = () => ({
      Authorization: `Bearer ${token}`,
   });

   const invalidateCart = () => queryClient.invalidateQueries({ queryKey: ['usercart'] });
   // Get Product For User At Cart
   const { data, isLoading } = useQuery({
      queryKey: ['usercart'],
      queryFn: () => axios.get(`${apiUrl}/cart`, { headers: authHeaders() }),
      enabled: !!token,
      refetchOnWindowFocus: false,
   });
   // adding Product To Cart
   const addProductToCart = useMutation({
      mutationFn: (productId) => {
         if (!requireAuth()) return;
         return (axios.post(`${apiUrl}/cart`, { productId }, {
            headers: authHeaders()
         }))
      },
      onSuccess: invalidateCart,
      onError: (err) => {
         console.log(err?.response?.data?.message)
      },
   });
   // update Product Quantity
   const updateQuantity = useMutation({
      mutationFn: ({ productId, quantity }) => {
         if (quantity < 1) return;
         return axios.put(`${apiUrl}/cart/product/${productId}`, { quantity }, {
            headers: authHeaders()
         })
      },
      onSuccess: () => {
         invalidateCart();
      },
      onError: (err) => {
         toast.info(err.response?.data?.message, {
            position: "top-left",
            closeOnClick: true
         })
      },
   })
   // delete Product From Cart
   const deleteProduct = useMutation({
      mutationFn: (id) => { return axios.delete(`${apiUrl}/cart/${id}`, { headers: authHeaders() }) },
      onSuccess: invalidateCart,
      onError: (err) => console.log(err?.response?.data?.message),
   });

   return (
      <cartContext.Provider value={{
         addToCart: addProductToCart,
         removeProductAtCart: deleteProduct,
         cartData: data?.data?.data,
         productsInCart: data?.data?.data?.cartItems ?? [],
         numOfCartItems: data?.data?.numOfCartItems ?? 0,
         totalPrice: data?.data?.totalPrice ?? 0,
         cartLoading: isLoading || false,
         updateQuantity,
      }}>
         {children}
      </cartContext.Provider>
   );
};

export default CartContextProvider;