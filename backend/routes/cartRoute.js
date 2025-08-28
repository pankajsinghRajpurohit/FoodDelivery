import { addToCart,removefromCart,getCart } from "../controllers/cartController.js";
import authMiddleWare from "../middlewares/auth.js";
import express from "express";
const cartRouter=express.Router();

cartRouter.post("/add",authMiddleWare,addToCart);
cartRouter.post("/remove",authMiddleWare,removefromCart);
cartRouter.post("/get",authMiddleWare,getCart);

export default cartRouter;
