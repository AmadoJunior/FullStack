const express = require("express");
const mongoDb = require("mongodb");

const router = express.Router();

// Get Posts
/*

When we send a get request to localhost:5000/api/posts,
it will return all of the objects in database inside an array.

*/
router.get('/', async (req, res) => {
    //Getting posts from data base
    const posts = await loadPostsCollection();
    //Seding an array of posts that are in the database
    res.send(await posts.find({}).toArray());
});

// Add Posts
/*

When sending a post request to localhost:5000/api/posts, 
it will create 3 properties one is -->
"text": contains the text provide in req.body.text, 
"createdAt": contains the data generated by the Date() function,
"_id": contains an automatically generated id by MongoDB

*/
router.post("/", async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.insertOne({ //insertOne is a mongoDb function that inserts
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send(); //Sends a HTTP status for the response.
})

// Delete Posts
/*
    This time the delete request will be sent to localhost:5000/api/posts/<id>
    The id is generated by the database automatically, we just have to
     reference it.
*/
router.delete('/:id', async (req, res) => { 
    //The delete needs an id to which post to delete
    const posts = await loadPostsCollection();

    await posts.deleteOne({_id: new mongoDb.ObjectID(req.params.id)}) 
    //deleteOne is a mongoDb function

    /* "req.params.<name>" will get the actual id that was passed.
    It needs to be wraped in mongoDb.ObjectID function because the 
    property "_id" spects a certain type.
    */

   res.status(200).send(); //Sends a HTTP status for the response. 
})

//Function to Retrieve data from my data base
async function loadPostsCollection(){
    //Creating my client variable which connects to MongoDB Atlas
    const client = await mongoDb.MongoClient.connect
    ("mongodb+srv://AmadoJunior:Amaditin4000041776@cluster0-s3lnp.mongodb.net/test?retryWrites=true&w=majority"
    ,{
        useNewUrlParser: true
    }); // mongoDb.MongoClient.connect takes in the link to the database and an object of options

    return client.db("UserData").collection("Posts");
}

module.exports = router;