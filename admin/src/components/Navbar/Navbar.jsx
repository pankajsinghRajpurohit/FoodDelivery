import React from 'react'
import './Navbar.css'

import { assets } from '../../assets/assets.js'

function Navbar() {
  return (
    <div className='navbar'>
        <img className="logo" src={assets.logo} />
        <img src={assets.profile_image}  className='profile' alt="" />
    </div>
  )
}

export default Navbar
