import AccountSideBar from './SideBar';
import { Outlet } from 'react-router-dom';

export default function AccountDashboard() {

   return (
      <div className="min-h-screen bg-gray-50 flex">
         <AccountSideBar />
         <main className="flex-1 lg:p-8 p-4">
            <Outlet />
         </main>
      </div>
   );
}