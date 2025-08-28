import jwt from "jsonwebtoken";


const authMiddleWare = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" })

    }
    try {
        //so basically coollect token and then varify token 
        // after save in token_decode and then inside the 
        // token we have userid so we store that id in req.body..
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
             if (!req.body) req.body = {};  
        req.body.userId = token_decode.id;
        next();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }

}
export default authMiddleWare;