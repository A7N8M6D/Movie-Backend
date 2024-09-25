import { Movie } from "../Models/movie.model.js";
/*
 
 
-----------------        Movie Create        -----------------


*/

const createDetailmovie = async (req, res) => {
  const { Title, Date, category } = req.body;
  const user = req.user._id;
  console.log(`Title ${Title} Date ${Date} Category ${category}`);
  if ([Title].some((field) => field?.trim() === "")) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if(!Date)
  {
    return res.status(400).json({ error: " Date is required" }); 
  }
  const existedTitle = await Movie.findOne({ Title });

  if (existedTitle) {
    return res.status(400).json({ error: `Title already Exist` });
  }

  try {
    const movieDetail = await Movie.create({
      Title,
      Date,
      user,
      category,
    });
    console.log(`User ${movieDetail}`);
    if (!movieDetail) {
      return res
        .status(500)
        .json({ error: "Something went wrong with the registration" });
    }

    // Return success response
    return res
      .status(201)
      .json({ movieDetail, message: "Movie created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
/*
 
 
-----------------        Get All Movies        -----------------


*/
const GetAllMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const category = req.query.category;

  console.log("category", category);

  let query = {};
  if (category) {
    query.category = category;
  }

  try {
    const movies = await Movie.find(query).skip(skip).limit(limit).exec();
    const totalMovies = await Movie.countDocuments(query);
    const totalPages = Math.ceil(totalMovies / limit);

    res.json({
      page,
      totalPages,
      data: movies,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/*
 
 
-----------------        Get  Movies        -----------------


*/
const GetMovie = async (req, res) => {
    const userId = req.user._id; 
  
    console.log("User ID: " + userId);
  
    try {
      
      const Movies = await Movie.find({ user: userId });
  
      if (!Movies) {
        return res.status(404).json({ error: "Movie Not Found" });
        
      }
  
      console.log("Fetched Store: ", Movies);
  
      return res
        .status(200)
        .json({Movies, message:"Movies Fetched Successfully"});
    } catch (error) {
      console.error("Error fetching store: ", error);
      return res
        .status(500)
        .json({  message:"Failed to Fetch Movie"});
    }
  };
  /*
 
 
-----------------        Update  Movie        -----------------


*/
const UpdateMovie = async (req, res) => {
    const { Title ,category,Date } = req.body; 
  const movie_id=req.query.id
    try {
      
      const movie = await Movie.findById(movie_id);
      if (!movie) {
        throw new ApiError(400, "Invalid Movie");
      }
  
      if (Title) movie.Title = Title;
      if (category) movie.category = category;
      if (Date) movie.Date = Date;
      
  
      
     const movieUpdated = await movie.save({ validateBeforeSave: false });
  
      return res
        .status(200)
        .json({ movieUpdated, message:"Movie updated successfully"});
    } catch (error) {
      return res
        .status(500)
        .json({message:"Failed to update Movie"});
    }
  };

    /*
 
 
-----------------        Delete  Movie        -----------------


*/
const DeleteMovie = async (req, res) => {
    const  Movie_id  = req.query.id;
    console.log(`Movie Id ${Movie_id}`)
    const deletedmovie = await Movie.findByIdAndDelete(Movie_id);
  
    // Check if the bond exists
    if (!deletedmovie) {
      return res.status(400).json({error: " Movie Not Found"});
    }
  
    return res
      .status(200)
      .json({ message:"Movie Delete Successfully"});
  };

export { createDetailmovie ,GetAllMovies,GetMovie,UpdateMovie,DeleteMovie};
