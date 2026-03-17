import Hero from '../../pages/Hero'
import Products from '../Products/Products'

const Home = () => {
  return (
    <div className='container mx-auto px-2'>
      <Hero/>
      <Products />
    </div>
  )
}

export default Home