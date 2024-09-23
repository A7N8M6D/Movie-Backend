import dotenv from "dotenv";
import conectDB from "./src/db/index.js";
import app from "./src/app.js";
dotenv.config({
  path: ".env",
});
console.log("Hello");
conectDB()
  .then(() => {
    app.on("Error", (error) => {
      console.log("Error ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server i running at Port ${process.env.PORT} `);
    });
  })
  .catch(
    (err) => {
      console.log("Mongo DB connection Failed", err);
    }
  );
