import { User } from "../Models/user.model.js";
import { generateAccessToken } from "../utils/generateAccessToken.utils.js";

/*
 
 
-----------------        Sign Up User        -----------------


*/
const createUser = async (req, res) => {
  const { UserName, Password, Email } = req.body;
  console.log(`User Name ${UserName} Password ${Password} E-Mail ${Email}`);
  if ([Password, UserName, Email].some((field) => field?.trim() === "")) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const existedUser = await User.findOne({ $or: [{ Email }] });
  if (existedUser) {
    return res.status(400).json({ error: `E-mail already Exist` });
  }

  try {
    const user = await User.create({
      UserName,
      Password,
      Email,
    });
    console.log(`User ${user}`);
    // Remove sensitive fields from the created user object
    // const createdUser = await User.findById(user._id).select(
    //   "-password -refreshToken"
    // );
    if (!user) {
      return res
        .status(500)
        .json({ error: "Something went wrong with the registration" });
    }

    // Return success response
    return res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
/*
 
 
-----------------        Sign In User        -----------------


*/
const loginUser = async (req, res) => {
  const { Password, Email } = req.body;
  console.log(`Password ${Password} E-Mail ${Email}`);
  try {
    if ([Password, Email].some((field) => field?.trim() === "")) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }
    console.log("Level 1");
    const isPasswordValid = await user.isPasswordCorrect(Password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password!" });
    }
    console.log("User COntroller", user);
    console.log("User ID COntroller", user._id);
    const accessToken = await generateAccessToken(user._id);
    console.log("Token generated ", accessToken);
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    // Set cookies with options
    // httpOnly: true,
    // secure: true, // Only for HTTPS
    const options = {
      sameSite: 'None', // Required for cross-origin cookies
      path: '/',
  }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)

      .json({
        user: loggedInUser,
        accessToken,
        message: "User logged in successfully!",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
/*
 
 
-----------------        Get Profile        -----------------


*/
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    console.log("user using token", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user, message: "User fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};
/*
 
 
-----------------        Logout        -----------------


*/
const Logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .json({ message: "User logged Out" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};
/*
 
 
-----------------        Update User        -----------------


*/
const updateProfile = async (req, res) => {
  try {
    const { UserName, Password, Email } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Email) user.Email = Email;
    if (UserName) user.UserName = UserName;

    if (Password) {
      user.Password = Password;
      user.markModified("Password");
    }

    const USER = await user.save();

    res.status(200).json({ message: "Profile updated successfully", USER });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while updating user" });
  }
};

export { createUser, loginUser, getProfile, Logout, updateProfile };
