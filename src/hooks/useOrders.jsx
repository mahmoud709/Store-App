import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const useOrders = (params = {}) => {
   const { data, isLoading } = useQuery({
      queryKey: ['orders', params],
      queryFn: () => axios.get(`${apiUrl}/orders`, {
         params,
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });
   return { data, isLoading };
};

export default useOrders;