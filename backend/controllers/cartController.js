import userModel from "../models/userModel.js";

//add items to user cart
//_id = mongodb id
// first find user after get the cartdata and addthe item
//  if alredy
//  exists increase qty and then update the user 

const  addToCart = async (req,res)=>{
   try{
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if(!cartData[req.body.itemId])
    {
        cartData[req.body.itemId] = 1
    }
    else {
        cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true ,message:"added to Cart"});
   }
   catch(error){
      console.log(error);
      res.json({success:false , message:"error"})
   }
}

//remove items from usercart
const removefromCart = async(req,res)=>{
  try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;

      if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId,{cartData});
      res.json({succcess : true,message:"Removed From Cart"})
  }
  catch (error){
    console.log(error);
    res.json({success : false , message:"error"})
  }
}

//fetch user cart data
const getCart =async (req,res)=>{
   try{
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      res.json({success: true,cartData})
   }
   catch(error){
     console.log(error);
     res.json({success:false,message:"Error"})
   }
}

export {addToCart,removefromCart,getCart}