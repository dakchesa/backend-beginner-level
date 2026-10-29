import express from "express";
const app = express (); //create an express app

//gives server permission to pass json request
app.use(express.json());
//import routes
import userRouter from './routes/user.route.js';
// import postRouter from './routes/post.route.js';

//routes declaration for the website link
app.use("/api/v1/users", userRouter);
//example route: http//localhost:4000/api/v1/users/register

export default app;