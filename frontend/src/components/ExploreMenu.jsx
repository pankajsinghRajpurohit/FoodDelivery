import React from 'react'
import "./ExploreMenu.css"
import {menu_list} from "../assets/frontend_assets/assets"

function ExploreMenu({category,setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
       <h1>Explore our menu</h1>
        <p className='explore-menu-text'> choose from a diverse menu featuring a delectable arry of data .our mission</p>
       <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
               
               <div className='explore-menu-list-item' onClick={()=>setCategory(prev=> prev===item.menu_name ?"All" : item.menu_name)} key={index} >
                    
                    <img className={category=== item.menu_name? "active":""} 
                    src={item.menu_image} alt="" />
                   
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
       </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
