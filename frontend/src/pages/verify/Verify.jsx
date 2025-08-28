import React from 'react'
import "./verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';

function Verify() {
    const [searchParams , setSearchParams] =  useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url } = useContext(StoreContext)
    const navigate = useNavigate();
   
   const verifypayment = async() => {
      const response = await axios.post(url+"/api/order/verify",{success,orderId})
      console.log("verify response:", response.data);
     if(response.data.success){
        navigate("/myorders")
        console.log("myorders")
     }
     else{
        navigate("/")
        console.log("myorders not working")
     }
   }
   useEffect(()=>{
    verifypayment();
   },[])
     
  return (
  <div className='verify'>
    <div className="spinner">

    </div>
      
    </div>
  )
}

export default Verify

