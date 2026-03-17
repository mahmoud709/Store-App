import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LodderSpinner from "../common/LoaderSpinnser/LodderSpinner";
import { Link } from "react-router-dom";
import SectionHeader from "../common/Section Header/SectionHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

const PrevArrow = ({ onClick }) => (
   <button
      onClick={onClick}
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
                 w-10 h-10 flex items-center justify-center
                 bg-white border border-gray-200 rounded-full shadow-md
                 hover:bg-gray-50 hover:shadow-lg hover:scale-105
                 transition-all duration-200 cursor-pointer"
   >
      <ChevronLeft className="w-5 h-5 text-gray-600" />
   </button>
);

const NextArrow = ({ onClick }) => (
   <button
      onClick={onClick}
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10
                 w-10 h-10 flex items-center justify-center
                 bg-white border border-gray-200 rounded-full shadow-md
                 hover:bg-gray-50 hover:shadow-lg hover:scale-105
                 transition-all duration-200 cursor-pointer"
   >
      <ChevronRight className="w-5 h-5 text-gray-600" />
   </button>
);

function Categories() {
   function fetchCategories() {
      return axios.get(`${apiUrl}/categories`);
   }

   const { data, isLoading } = useQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });

   if (isLoading) return <LodderSpinner />;

   const categoriesData = data?.data?.data;

   const settings = {
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
         {
            breakpoint: 1280,
            settings: { slidesToShow: 4 },
         },
         {
            breakpoint: 1024,
            settings: { slidesToShow: 3 },
         },
         {
            breakpoint: 640,
            settings: { slidesToShow: 2 },
         },
         {
            breakpoint: 400,
            settings: { slidesToShow: 1 },
         },
      ],
   };

   return (
      <section className="py-10">
         <SectionHeader title="Shop by category" />

         <div className="relative px-6 mt-6">
            <Slider {...settings}>
               {categoriesData?.map((category) => (
                  <div key={category?._id} className="px-2">
                     <Link to={`/category/${category?._id}`}>
                        <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">

                           {/* Image */}
                           <div className="relative h-48 overflow-hidden">
                              <img
                                 src={category?.image?.url}
                                 alt={category?.slug}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {/* Gradient overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                           </div>

                           {/* Label */}
                           <div className="px-4 py-3 flex items-center justify-between">
                              <h3 className="text-sm font-semibold text-gray-800 capitalize truncate">
                                 {category?.name}
                              </h3>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                           </div>

                           {/* Bottom accent bar */}
                           <div className="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-300 rounded-b-2xl" />
                        </div>
                     </Link>
                  </div>
               ))}
            </Slider>
         </div>
      </section>
   );
}

export default Categories;