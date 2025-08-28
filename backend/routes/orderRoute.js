import express from "express"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"
import authMiddleWare from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleWare,placeOrder);
orderRouter.post("/verify",verifyOrder )
orderRouter.post("/userorders",authMiddleWare,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)


export default orderRouter;