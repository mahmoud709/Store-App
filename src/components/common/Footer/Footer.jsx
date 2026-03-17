import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="bg-gray-900 text-gray-300 mt-20">
         <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
               <h2 className="text-2xl font-bold text-white mb-4">ShopEase</h2>
               <p className="text-sm leading-relaxed">
                  Your one-stop online shop for quality products at the best prices.
                  Fast delivery and secure payments guaranteed.
               </p>
            </div>

            {/* Quick Links */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
               <ul className="flex flex-col gap-2 ">
                  <Link to={'/'}>
                     <li className="hover:text-white cursor-pointer">Home</li>

                  </Link>
                  <Link to={'/products'}>
                     <li className="hover:text-white cursor-pointer">Products</li>

                  </Link>
                  {/* <li className="hover:text-white cursor-pointer">Categories</li> */}
                  <Link to={'/about-us'}>
                     <li className="hover:text-white cursor-pointer">About Us</li>
                  </Link>

               </ul>
            </div>

            {/* Customer Service */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
               <ul className="flex flex-col gap-2">
                  {/* <li className="hover:text-white cursor-pointer">Contact Us</li> */}
                  <Link to={'/faq'}>
                     <li className="hover:text-white cursor-pointer">FAQ</li>
                  </Link>
                  <Link to={'/returns'}>
                     <li className="hover:text-white cursor-pointer">Returns</li>

                  </Link>
                  <Link to={'/privacy-policy'}>
                     <li className="hover:text-white cursor-pointer">Privacy Policy</li>

                  </Link>
               </ul>
            </div>

            {/* Contact */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
               <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Mail size={16} /> support@shopease.com</li>
                  <li className="flex items-center gap-2"><Phone size={16} /> +20 100 000 0000</li>
                  <li className="flex gap-4 mt-4">
                     <Facebook className="hover:text-white cursor-pointer" />
                     <Instagram className="hover:text-white cursor-pointer" />
                     <Twitter className="hover:text-white cursor-pointer" />
                  </li>
               </ul>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
         </div>
      </footer>
   );
};

export default Footer;
