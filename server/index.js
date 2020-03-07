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
app.use(express.json());
app.use(cors());

const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

// Handle production 
if(process.env.NODE_ENV === "production") { //This will become true as soon
    //as we deply to heroku
    // Static folder
    app.use(express.static(__dirname + "/public/"));

    //Handle Single Page App
    // "/.*/" refers to any route
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + "/public/index.html")
    });
}

//Port Variable
const port = process.env.PORT || 5000;

//Starting the server
app.listen(port, () => console.log(`Server started on port ${port}`));