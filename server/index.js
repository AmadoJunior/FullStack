const express = require("express");
//const bodyParser = require("body-parser") **Not need**
/* 
    Use express.json for json
    Use expres.urlencoded() for forms
*/
const cors = require("cors"); //Cross-Origin Resource Sharing
/* 
    The front-end and the back-end are from different origins
*/

const app = express();

//Middleware
/**
 * app.use Mounts the specified middleware function or 
 * functions at the specified path: 
 * the middleware function is executed when the base of
 *  the requested path matches path.
 */
app.use(express.json());
app.use(cors());

const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

// Handle production 
if(process.env.NODE_ENV === "production") { //This will become true as soon
    //as we deply to heroku
    // Settign up my static folder, "express.static" serves static files
    app.use(express.static(__dirname + "/public/"));

    //Handle Single Page App
    // "/.*/" refers to any route
    app.get(/.*/, (req, res) => {
        /*
        app.get(path, callback) routes HTTP GET requests to the specified path
        with the specified callback function.
        */
        res.sendFile(__dirname + "/public/index.html")
    });
}

//Port Variable
const port = process.env.PORT || 5000;

//Starting the server
app.listen(port, () => console.log(`Server started on port ${port}`));