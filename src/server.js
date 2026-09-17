import express from "express";
import "dotenv/config";
import AnimeRouter from "./routes/animes.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/animes", AnimeRouter);

app.listen(PORT, () => console.log("Server running on port: 5000"));























// express is is our backend framework
// server speaks to the database, and the frontend/client
// PORT - choosing a port to run our node/express application on locally (localhost)
// HTTP methods:

/**
 * GET - get a resource/data
 * POST - adds/creates a new resource
 * PATCH/PUT - modify/update a resource
 * DELETE - delete a resource/data
 */

// add more animes
// title, rating, release_year, episodes, hasDub

// request
/**
 *
 * const options = {
 *  method: "POST"
 *  headers: {
 *    "content-type": "application/json",
 *  },
 *  body: {
 *    title,
 *    rating,
 *    release_year,
 *    episodes,
 *    hasDub
 *  }
 * }
 *
 * await fetch(url, options)
 */

// Zod, Yup
// const response = fetch(url).then(res => res.json()) 
// converting a json object into a javascript object