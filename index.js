const express = require('express');
const {users} = require("./data/users.json");
const {books} = require('./data/books.json');

const app = express();
const port = 8081;

app.use(express.json());

app.get("/",(res,req)=>{
    res.status(200).json({
        message : "Server's up and running ",
        data : "hey"
    });
});

/**
 * Route : /users
 * Method : GET
 * Description : Get all the users info 
 * Access : Public
 * Parameter : None
 */

app.get("/users",(req,res)=>{
    // res.status(200).json({
    //     success: true,
    //     data: users
    // });
    res.status(200).json({
        success: true,
        data: users,
    });
});

app.get('*',(req,res)=>{
    res.status(404).json({
        message : "This route doesn't exist"
    })
})

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});
