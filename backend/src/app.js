import express from "express";
const app = express (); //create an express app

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working");
});

export default app;