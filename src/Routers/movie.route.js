import { Router } from "express";
import { createDetailmovie, DeleteMovie, GetAllMovies, GetMovie, UpdateMovie } from "../controllers/movie.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router=Router()
router.route("/create").post(verifyJWT, createDetailmovie)
router.route("/getAll").get( GetAllMovies)
router.route("/get").get( verifyJWT, GetMovie)
router.route("/update").put( verifyJWT,UpdateMovie)
router.route("/delete").delete( verifyJWT, DeleteMovie)


export default router