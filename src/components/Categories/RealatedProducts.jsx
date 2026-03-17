import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import LodderSpinner from "../common/LoaderSpinnser/LodderSpinner";
import ProductCard from "../Products/ProductCard";
import SectionHeader from "../common/Section Header/SectionHeader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const apiUrl = import.meta.env.VITE_API_URL;

const RelatedProducts = () => {
   const { id } = useParams(); // ✅ this is already the category id


   function fetchProducts() {
      return axios.get(`${apiUrl}/products?category=${id}`,
      );
   }
   const { data, isLoading } = useQuery({
      queryKey: ['products', id],
      queryFn: fetchProducts,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: id ? true : false,
   })

   if (isLoading) return <LodderSpinner />;

   const productsData = data?.data?.data;
   if (!productsData?.length) return (
      <div className="container mx-auto my-10 px-4 text-center text-gray-400 py-16 min-h-screen">
         No products found in this category.
      </div>
   );

   return (
      <div className="container mx-auto my-10 px-4 min-h-screen">
         <SectionHeader title="Related Products" />
         <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-6">
            {productsData.map((pro) => (
               <ProductCard pro={pro} key={pro._id} />
            ))}
         </div>
      </div>
   );
};

export default RelatedProducts;