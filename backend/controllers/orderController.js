import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe  from "stripe"

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = async (req, res) => {
  const frontend_url = "https://fooddelivery-frontend-z4jp.onrender.com";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd", // 👈 change to "usd" if you want dollars
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // $ → cents
      },
      quantity: item.quantity,
    }));

    // ✅ Calculate subtotal in cents
    let subtotal = req.body.items.reduce(
      (acc, item) => acc + item.price * 100 * item.quantity,
      0
    );

    // ✅ Delivery fee (e.g. $0.50 minimum)
    let deliveryFee = 200; // $2.00 (safe amount)

    // ✅ Ensure total >= $0.50
    if (subtotal + deliveryFee < 50) {
      deliveryFee = 50 - subtotal; // auto-fix
    }

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryFee,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const verifyOrder =async (req,res)=>{
   const {orderId,success} = req.body;
   try{
      if(success=="true") {
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"Paid"})
      }
      else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
      }

   }catch(error){
          console.log(error);
          res.json({success:false,message:"Error"})
   }
} 

const userOrders = async (req,res)=>{
   try{

    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})

   }catch(error){
      console.log(error);
      res.json({success:false,message:"Error"})
   }
}

// listing orders for admin panel
 const listOrders = async(req,res)=>{
    try{
      const orders = await orderModel.find({});
       res.json({success:true,data:orders})
    }
    catch(error){
      console.log(error);
      res.json({success:false,message:"Error"})
    }
 }
 //api for updating order status

 const updateStatus = async(req,res)=>{
   try{
      
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"status updated"})
   }catch(error){
      console.log(error);
     res.json({success:false,message:"error"})

      
   }
 }

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
