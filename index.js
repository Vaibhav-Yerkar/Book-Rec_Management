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
    res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * Route : /users/:id
 * Method : GET
 * Description : Get user's info via id
 * Access : Public
 * Parameter : Id
 */
app.get("/users/:id",(req,res)=>{
    const { id } = req.params;
    const user = users.find((elem)=> elem.id === id);
    if (!user){
        return res.status(404).json({
            success: false,
            message: "User not Found !"
        });
    }
    return res.status(200).json({
        success: true,
        message: "User Found",
        data:  user,
    });
});

/**
 * Route : /users
 * Method : POST
 * Description : Creating new User
 * Access : Public
 * Parameter : None
 */
app.post('/users',(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
    const user = users.find((elem)=> elem.id === id);
    if(user){
        return res.status(404).json({
            success: false,
            message: "User with the ID already exist",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(202).json({
        success: true,
        message: "User added Successfully",
        data: users,
    });

});

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating User via id
 * Access : Public
 * Parameter : Id
 */
app.put('/users/:id',(req,res)=>{
    const id = req.params.id;
    const {data} = req.body;
    const user = users.find((elem)=>elem.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not Found !"
        });
    }
    const updateUserData = users.map((elem)=>{
        if(elem.id === id){
            return {
                ...elem,
                ...data
            };
        }
        return elem;
    });
    return res.status(200).json({
        success: true,
        message: "User Data Updated Successfully",
        data : updateUserData,
    });

});

/**
 * Route : /users/:id
 * Method : DELETE
 * Description : deleting User via id
 * Access : Public
 * Parameter : Id
 */
app.delete('/user/:id',(req,res)=>{
    const { id } = req.params;
    const user = users.find((elem)=> elem.id === id);
    if (!user){
        return res.status(404).json({
            success: false,
            message: "User not Found !"
        });
    }
    // todo : remaining to be implemented
});


/**
 * Route : /books
 * Method : GET
 * Description : Get all the books info 
 * Access : Public
 * Parameter : None
 */
app.get('/books',(req,res)=>{
    res.status(200).json({
        success: true,
        data: books,
    });
});

/**
 * Route : /books
 * Method : POST
 * Description : Creating/Adding new Books
 * Access : Public
 * Parameter : None
 */
app.post('/books',(req,res)=>{
    const {id,name,author,genre,price,publisher} = req.body;
    const book = books.find((elem)=> elem.id === id);
    if(book){
        return res.status(404).json({
            success: false,
            message: "Book with the ID already exist",
        });
    }
    books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    });
    return res.status(202).json({
        success: true,
        message: "Book added Successfully",
        data: books,
    });

});

/**
 * Route : /books/:id
 * Method : GET
 * Description : Get book's info via id
 * Access : Public
 * Parameter : Id
 */
app.get("/books/:id",(req,res)=>{
    const { id } = req.params;
    const book = books.find((elem)=> elem.id === id);
    if (!books){
        return res.status(404).json({
            success: false,
            message: "Book not Found !"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Book Found",
        data:  book,
    });
});

/**
 * Route : /books/:id
 * Method : PUT
 * Description : Updating Book via id
 * Access : Public
 * Parameter : Id
 */
app.put('/books/:id',(req,res)=>{
    const id = req.params.id;
    const {data} = req.body;
    const book = books.find((elem)=>elem.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not Found !"
        });
    }
    const updateBookData = books.map((elem)=>{
        if(elem.id === id){
            return {
                ...elem,
                ...data
            };
        }
        return elem;
    });
    return res.status(200).json({
        success: true,
        message: "Book Data Updated Successfully",
        data : updateBookData,
    });

});

/**
 * Route : /books/:id
 * Method : DELETE
 * Description : Deleting Book via id
 * Access : Public
 * Parameter : Id
 */
app.delete('/books/:id',(req,res)=>{
    const id = req.params.id;
    const book = books.find((elem)=>elem.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not Found!",
        });
    }
    books.find((elem,index)=>{
        if(elem.id === id){
            books.splice(index,1);
            res.status(200).json({
                success: true,
                message: "Book Deleted Successfully",
                data: books,
            });
        }
    });
});

/**
 * Route : /books/issued
 * Method : GET
 * Description : Get all Issued Book info
 * Access : Public
 * Parameter : None
 */
app.get('/books/issued',(req,res)=>{

});



app.get('*',(req,res)=>{
    res.status(404).json({
        message : "This route doesn't exist"
    })
})

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});
