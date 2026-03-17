import { Gift, Headphones, PiggyBank, ShoppingCart, Truck, Users } from "lucide-react";
import FeatureCard from "../components/common/FeatureCard/FeatureCard";
import { Link } from "react-router-dom";



const features = [
   { icon: Truck, title: 'Free Shipping', delay: 0 },
   { icon: ShoppingCart, title: 'Online Order', delay: 100 },
   { icon: PiggyBank, title: 'Saving Money', delay: 200 },
   { icon: Gift, title: 'Promotions', delay: 300 },
   { icon: Users, title: 'Happy Sell', delay: 400 },
   { icon: Headphones, title: 'F24 / 7 Support', delay: 500 }
];

const Hero = () => {

   return (
      <>
         <div className="min-h-screen">
            <div className="flex flex-col gap-8">
               <div className="grid md:grid-cols-1 gap-16 pt-12">
                  <div className=" ">
                     <h1 className="md:text-6xl text-3xl capitalize leading-snug md:font-bold font-semibold">Every Thing You need, <br /> <span className="text-[#3166F8]">delivered tommorow</span></h1>
                     <p className="hero-subtitle md:w-[70%] text-lg md:py-6 py-3 leading-normal capitalize text-gray-700">
                        From latest tech gadgets to fresh groceries and home essentials. Experience the new standard of online shopping with Universa.
                     </p>
                     <Link to='/products'>
                        <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white md:px-8 md:py-4 px-4 py-2 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                           Get Started Today
                        </button>
                     </Link>
                  </div>

               </div>
               {/* Features Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  {features.map((feature, index) => (
                     <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        delay={feature.delay}
                     />
                  ))}
               </div>
            </div>
         </div>


      </>
   )
}

export default Hero