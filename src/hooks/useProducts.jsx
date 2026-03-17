import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const useProducts = (params = {}) => {
   function fetchProducts() {
      return axios.get(`${apiUrl}/products`, {params}
      );
   }
   const { data, isLoading } = useQuery({
      queryKey: ['products', params],
      queryFn: fetchProducts,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // enabled: category ? true : false,
   })
   return { data, isLoading };
}

export default useProducts;