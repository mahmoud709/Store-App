import { Outlet } from "react-router-dom"
import Navbar from "../common/Header/Navbar"
import Footer from "../common/Footer/Footer"
import AuthContextProvider from "../../Context/AuthContext"
import CartContextProvider from "../../Context/CartContext"
import ScrollToTop from "../common/SmoothScroll/ScrollToTop"

const MainLayout = () => {
  return (
    <div className="">
      <AuthContextProvider>
        <CartContextProvider>
          <Navbar />
          <div className="mt-25">
            <Outlet />
            <ScrollToTop />
          </div>
          <Footer />
        </CartContextProvider>
      </AuthContextProvider>

    </div>
  )
}

export default MainLayout