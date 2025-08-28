import React,{ useState } from 'react'

import Navbar from './components/Navbar'
import { Route , Routes} from "react-router-dom"
import Cart from './pages/cart/Cart'
import Verify from './pages/verify/Verify.jsx'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Home from './pages/home/Home.jsx'
import Footer from "./components/footer/Footer.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import MyOrders from './pages/MyOrders/MyOrders.jsx'

const App = () => {

  const [showLogin , setShowLogin] = useState(false);
  return (<>

    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
   
    <div className='app'>
   <Navbar setShowLogin={setShowLogin}/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/cart" element={<Cart/>} />
    <Route path="/order" element={<PlaceOrder/>} />
    <Route path='/verify' element={<Verify/>} />
    <Route path="/myorders" element={<MyOrders/>}/>
   </Routes>
    </div>
    <Footer/>
  </>
  )
}

export default App
