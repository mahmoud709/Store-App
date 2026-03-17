import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const useCategories = () => {
   function fetchProducts() {
      return axios.get(`${apiUrl}/categories`);
   }
   const { data, isLoading } = useQuery({
      queryKey: ['categories'],
      queryFn: fetchProducts,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   })
   return { data, isLoading };
}

export default useCategories