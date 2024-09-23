import jwt from "jsonwebtoken"
import { User } from "../Models/user.model.js"
export const verifyJWT = async (req,res, next) => {
    try {
        const Token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
      console.log("level 1");
      console.log("refreshtoken" + JSON.stringify(Token));
      if (!Token) {
        
        return res.status(401).json({ message:"Unathorized Request"});
        
      }
      console.log("process.env.ACCESS_TOKEN_SECRET",process.env.ACCESS_TOKEN_SECRET)
      console.log("2");
      const decodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
      console.log("3");
      console.log("decodedToken" + JSON.stringify(decodedToken));
  
    //   const user = await User.findById(decodedToken?._id).select(
    //     "-password -refreshToken"
    //   );
    //   console.log("4");
    //   if (!user) {
        
    //     console.log("5");
    //     return res.status(401).json({ message:"Invalid Refresh Token"});
    //   }
      req.user = decodedToken;
      console.log("end");
      next();
    } catch (err) {
        return res.status(401).json({ message:"Invalid Access Token"});
      
    }
  };