import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";

dotenv.config();
connectDB();
const port = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors());

app.use("/api/", shortUrl);
app.get("/", (req, res) => {
    res.send("This is working");
})

app.listen(port, ()=>{
    console.log(`Server started successfully on port ${port}`)
})
