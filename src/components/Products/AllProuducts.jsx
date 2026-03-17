import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import LodderSpinner from "../common/LoaderSpinnser/LodderSpinner";
import SectionHeader from "../common/Section Header/SectionHeader";
import ProductCard from "./ProductCard";
import useCategories from "../../hooks/useCategories";

const AllProuducts = () => {
   const [sort, setSort] = useState('-createdAt');
   const [category, setCategory] = useState('');
   const { data: CategoriesData } = useCategories();
   const { data, isLoading } = useProducts({ sort, ... (category && { category }) });
   if (isLoading) return <LodderSpinner />
   const productsData = data?.data?.data;
   const filteredCategories = [... new Map(CategoriesData?.data?.data?.map((el) => [el._id, el])).values()];
   return (
      <div className="container mx-auto my-5">
         <div className="lg:px-0 px-3">
            <SectionHeader title="all products" />
            <span className="pr-3 text-gray-600 text-sm font-semibold">Sort By</span>
            <select
               value={sort}
               className="border mb-3 cursor-pointer outline-0 border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
               onChange={(e) => { setSort(e.target.value) }}
            >
               <option value="-createdAt">Newest</option>
               <option value="-price">Price: High to Low</option>
               <option value="price">Price: Low to High</option>
               <option value="-ratingAverage">Top Rated</option>
            </select>
         </div>
         {/* Category filters */}
         <div className="flex gap-2 flex-wrap mb-4 lg:px-0 px-3">
            <button
               onClick={() => setCategory('')}
               className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${category === ''
                  ? 'bg-black text-white border-black'
                  : 'text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
            >
               All
            </button>
            {filteredCategories?.map((cat) => (
               <button
                  key={cat._id}
                  onClick={() => {
                     setCategory(cat._id);
                  }}
                  className={`px-4 py-1.5 my-2 rounded-full text-sm border transition-colors capitalize ${category === cat._id
                     ? 'bg-black text-white border-black'
                     : 'text-gray-600 border-gray-200 hover:border-gray-400'
                     }`}
               >
                  {cat.name}
               </button>
            ))}
         </div>
         <>
            {/* Products grid */}
            {productsData?.length === 0 ? (
               <div className="text-center py-20 text-gray-400">
                  No products found in this category.
               </div>
            ) : (
               <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
                  {productsData?.map((pro) => (
                     <ProductCard pro={pro} key={pro?.id} />
                  ))}
               </div>
            )}
         </>
      </div>
   )
}

export default AllProuducts