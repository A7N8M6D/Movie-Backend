import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    UserName: {
      type: String,
      require: true,
      trim: true,
    },
    Email: {
      type: String,
      require: true,
      trim: true,
    },
    Password: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    console.log("Password not modified, skipping hash.");
    return next();
  }
  console.log("Password modified, hashing...");
  this.Password = await bcrypt.hash(this.Password, 10);
  next();
});

userSchema.methods.generateaccessToken = function () {
  try {
    console.log("Generating access token...");

    // Generate access token using jwt.sign()
    const accessToken = jwt.sign(
      {
        _id: this._id,
        Email: this.Email,
        
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    console.log("Access token generated successfully");
    return accessToken;
  } catch (error) {
    // Handle any errors that occur during token generation
    console.error("Error generating access token:", error);
    throw new Error("Failed to generate access token");
  }
};


userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.Password);
};
export const User = mongoose.model("User", userSchema);
