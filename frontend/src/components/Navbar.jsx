import React, { Profiler, useContext, useState } from 'react'
import { assets } from "../assets/frontend_assets/assets"
import "./Navbar.css"
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu,setmenu]= useState("home");
 
    const {getTotalCartAmount,token,setToken} =useContext(StoreContext);
    const navigate = useNavigate();
    const logout = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }
  return (
    <div className='navbar' id='navbar'>
     <Link to='/'> <img src={assets.logo} alt=""  className='logo'/></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=> setmenu("home")} className={menu==="home" ? "active":""}>home</Link>
        <a  href='#explore-menu' onClick={()=> setmenu("menu")} className={menu==="menu" ? "active":""}>menu</a>
        <a href='#app-download'  onClick={()=> setmenu("mobile-app")}className={menu==="mobile-app" ? "active":""}>mobile-app</a>
        <a href='#footer' onClick={()=> setmenu("contact-us")} className={menu==="contact-us" ? "active":""}>contact</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
           <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link> 
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token ? <button onClick={()=>setShowLogin(true)}> <a href="#home">sign in</a></button>
        :<div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
             <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>logout</p></li>
             </ul>
           </div>

        }
        
      </div>
    </div>
  )
}

export default Navbar
