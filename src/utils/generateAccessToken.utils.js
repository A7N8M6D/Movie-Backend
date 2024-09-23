import { User } from "../Models/user.model.js";

const generateAccessToken= async(UserID)=>{
try{
  console.log("User in gg",UserID)
   const user=await User.findById(UserID)
   console.log("User", user);
   const accessToken=user.generateaccessToken()
   console.log(`Access Token ${accessToken}`)
   return accessToken;

}
catch( error)
{
  console.error("Error while generating refresh and access tokens:", error);
    // If this is part of an Express route, you can return res.status(500).json(), otherwise throw the error
    throw new Error(
      "Something went wrong while generating refresh and access token"
    );
}
}
export {generateAccessToken}