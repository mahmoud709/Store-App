import ProductCard from './ProductCard'
import Categories from '../Categories/Categories';
import useProducts from '../../hooks/useProducts';
import SectionHeader from '../common/Section Header/SectionHeader';
import LodderSpinner from '../common/LoaderSpinnser/LodderSpinner';

const Products = () => {

   const { data, isLoading } = useProducts();
   const productsData = data?.data?.data;
   if (isLoading) return <LodderSpinner />

   return (
      <div className='my-5'>
         <Categories />
         <SectionHeader title="featured products" path='/products' pathContent="view all products" />
         <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-4'>
            {productsData?.slice(0, 4)?.map((pro) => <ProductCard pro={pro} key={pro?.id} />)}
         </div>
      </div>
   )
}

export default Products