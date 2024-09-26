import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limit } from "./utils/constants.js";
const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
// credentials:true

app.use(express.json({limit}))
//
app.use(express.urlencoded({extended:true , limit}))

app.use(express.static("public"))

app.use(cookieParser())
import userRouter from "./Routers/user.route.js"
import movieRouter from "./Routers/movie.route.js"
app.use("/api/v1/users",userRouter)
app.use("/api/v1/movie",movieRouter)

export default app