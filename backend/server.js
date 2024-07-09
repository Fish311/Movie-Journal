const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require("mongoose")
const path = require("path");
require("dotenv").config();
const {expressjwt} = require('express-jwt')

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

//middleware
app.use(express.json())
app.use(morgan('dev'))
// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, "client", "dist")));

//routes
app.use('/api/auth', require('./routes/authRouter.js'))
app.use('/api/protected', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/protected/movies', require("./routes/movieRouter.js"))
app.use('/api/protected/comments', require('./routes/commentRouter.js'))
app.use('/api/protected/watchlistMovies', require('./routes/watchlistMovieRouter.js'))

//error processing
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.listen(9000, () => {
    console.log('the server is running on port 9000')
})


/*
    Questions to ask:
        -Error about mapping in MovieList.jsx when logging out and then signing up 
*/