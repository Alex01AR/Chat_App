import dotenv from "dotenv"
import {app,io,server} from './app.js'
import connectDB from "./src/db/database.js"

dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
   
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})