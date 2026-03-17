import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import Home from '../components/Home/Home';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import AllProuducts from '../components/Products/AllProuducts';
import LoginPage from './../components/Auth/Login';
import Cart from '../components/Cart/Cart';
import Register from '../components/Auth/Register';
import AccountDashboard from '../components/UserProfile/AccountDashboard';
import PrivateRoute from '../Context/PrivateRoute';
import PublicRoute from '../Context/PublicRoute';
import ProfileInfo from '../components/UserProfile/ProfileInfo';
import Orders from '../components/UserProfile/Orders';
import CreateOrder from '../components/Orders/CreateOrder';
import OrderSuccess from './../components/Orders/OrderSuccess';
import OrderFailed from './../components/Orders/OrderFailed';
import RelatedProducts from './../components/Categories/RealatedProducts';
import About from './../pages/About';
import FAQ from '../pages/FAQ';
import Returns from '../pages/Returns';
import PrivacyPolicy from '../pages/PrivacyPolicy';

export const routes = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/about-us',
            element: <About />,
         },
         {
            path: '/faq',
            element: <FAQ />,
         },
         {
            path: '/returns',
            element: <Returns />,
         },
         {
            path: '/privacy-policy',
            element: <PrivacyPolicy />,
         },
         {
            path: '/cart',
            element: <PrivateRoute>
               <Cart />
            </PrivateRoute>,
         },
         {
            path: '/category/:id',
            element: <RelatedProducts />,
         },
         {
            path: '/products',
            element: <AllProuducts />,
         },
         {
            path: '/products/:id',
            element: <ProductDetails />
         },
         {
            path: '/login',
            element: <PublicRoute>
               <LoginPage />
            </PublicRoute>
         },
         {
            path: '/signup',
            element: <PublicRoute>
               <Register />
            </PublicRoute>
         },
         {
            path:`/cart/:cartId/create-order`,
            element:<CreateOrder/>
         },
         {
            path:`/cart/:cartId/create-order/success`,
            element:<OrderSuccess/>
         },
         {
            path: `/cart/:cartId/create-order/failed`,
            element: <OrderFailed />
         },
         {
            path: '/profile',
            element: (<PrivateRoute>
               <AccountDashboard />
            </PrivateRoute>),
            children: [
               {
                  index: true,
                  element: <ProfileInfo />
               },
               {
                  path: 'orders',
                  element: <Orders />
               }
            ]

         }
      ],
   },
]);

