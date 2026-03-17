import { useContext, useState } from 'react';
import { Package, MapPin, CreditCard, Heart, Settings, LogOut, Edit } from 'lucide-react';
import { AuthContext } from './../../Context/AuthContext';
import { Link } from 'react-router-dom';

export default function AccountSideBar() {
   const [activeTab, setActiveTab] = useState('overview');
   const menuItems = [
      { id: 'overview', label: 'Overview', icon: Package,path:'' },
      { id: 'orders', label: 'Orders', icon: Package, path:'orders' },
      { id: 'addresses', label: 'Addresses', icon: MapPin, path: '' },
      { id: 'payment', label: 'Payment Methods', icon: CreditCard, path: '' },
      { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '' },
      { id: 'settings', label: 'Settings', icon: Settings, path: '' },
   ];
   const { handleLogout } = useContext(AuthContext);

   return (
      <aside className="w-64 bg-white border-r border-gray-200 p-6 lg:flex hidden">
         <nav className="space-y-1">
            {menuItems.map((item) => {
               const Icon = item.icon;
               return (
                  <Link
                     to={item?.path}
                     key={item.id}
                     onClick={() => setActiveTab(item.id)}
                     className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                  >
                     <Icon size={18} />
                     {item.label}
                  </Link>
               );
            })}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm cursor-pointer font-medium text-red-600 hover:bg-red-50 transition-colors mt-8">
               <LogOut size={18} />
               Sign Out
            </button>
         </nav>


      </aside>

   );
}