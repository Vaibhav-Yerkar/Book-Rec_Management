const express = require('express');
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route : /books
 * Method : GET
 * Description : Get all the books info 
 * Access : Public
 * Parameter : None
 */
router.get('/',(req,res)=>{
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
router.post('/',(req,res)=>{
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
router.get("/:id",(req,res)=>{
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
router.put('/:id',(req,res)=>{
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
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    const book = books.find((elem)=>elem.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not Found!",
        });
    }

    book_index = books.indexOf(book);
    books.splice(book_index,1);

    res.status(200).json({
        success: true,
        message: "Book Deleted Successfully",
        data: books,
    });
});

/**
 * Route : /books/issued
 * Method : GET
 * Description : Get all Issued Book info
 * Access : Public
 * Parameter : None
 */
router.get('/issued/info',(req,res)=>{
    const usersWithIssuedBook = users.filter((elem)=>{
        if(elem.issuedBook){
            return elem;
        }
    });
    const issuedBooks = [];

    usersWithIssuedBook.forEach((elem)=>{
        const book = books.find((book)=> elem.issuedBook === book.id);

        book.issuedBy = elem.name;
        book.issuedDate = elem.issuedDate;
        book.returnDate = elem.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks){
        res.status(200).json({
            success: true,
            message: "Issued by data Found",
            data : issuedBooks,
        });
    }else{
        res.status(404).json({
            success: false,
            message: "No issued book found"
        });
    }
});



module.exports = router;