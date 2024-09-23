import mongoose, { model, Schema } from "mongoose";
const movieSchema=new Schema(
    {
      Title:{
        type:String,
        require:true
      },Date:{
        type:Number,
        require:true
      },
      category:
      {
        type:String,
        require:true
      },
      Imagesrc:{
        type:String
      },
      user:{
        type:Schema.Types.ObjectId,
        ref:"User"
      }
    },{
             timestamps:true
    }
)
 export const Movie=new model("Movie",movieSchema)