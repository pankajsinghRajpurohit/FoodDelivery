import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  
  const {getTotalCartAmount,token,food_list,cartItems,url} =useContext(StoreContext);
 const [ data ,  setData ] =useState({
  firstName: "",
  lastName:"",
  email: "",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""
 })

 const onChanageHandler = (event)=>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data=>({...data , [name]:value }))
 }
 //add the quantity in  items obj...

 const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [] ;
    food_list.map((item)=>{
       if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
       }
    })
    // console.log(orderItems);
   let orderData = {
     address:data,
     items:orderItems,
     amount:getTotalCartAmount() +2,
   } 
   let response = await axios.post("https://fooddelivery-backend-y2yc.onrender.com/api/order/place",orderData,{headers:{token}})
   if(response.data.success){
    const {session_url} = response.data;
    window.location.replace(session_url);
   }
   else{
    alert("Error")
   }
 }
  const navigate= useNavigate();

  useEffect(()=>{
  if(!token){
    navigate("/cart")
  }
  else if(getTotalCartAmount()=== 0)
  {
    navigate("/cart")
    
  }
 },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input  required  onChange={onChanageHandler} type="text" name='firstName' value={data.firstName} placeholder='First name' />
            <input required  onChange={onChanageHandler} type="text" name='lastName' value={data.lastName} placeholder='Last name' />
          </div>
          <input  required onChange={onChanageHandler} type="email" name='email' value={data.email} placeholder='Email adress' />
          <input required  onChange={onChanageHandler} type="text" name='street' value={data.street} placeholder='Street' />
          <div className="multi-fields">
              <input required  onChange={onChanageHandler} name='city' value={data.city} type="text" placeholder='City' />
              <input required  onChange={onChanageHandler} name="state" type="text" value={data.state} placeholder='State' />
          </div>
          <div className="multi-fields">
              <input required  onChange={onChanageHandler} type="text" name='zipcode' value={data.zipcode} placeholder='Zip code' />
              <input  required  onChange={onChanageHandler} type="text" name='country' value={data.country} placeholder='Country' />
          </div>
          <input required  onChange={onChanageHandler} type="text" name='phone' value={data.phone} placeholder='Phone' />
        </div>

        <div className="place-order-right">
               <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>$<b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b></b>
            </div>
          </div>
          <button type='submit' >PROCCED TO Payment</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder
