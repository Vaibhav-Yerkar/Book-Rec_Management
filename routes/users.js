const express = require('express');
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route : /users
 * Method : GET
 * Description : Get all the users info 
 * Access : Public
 * Parameter : None
 */
router.get("/",(req,res)=>{
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
router.get("/:id",(req,res)=>{
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
router.post('/',(req,res)=>{
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
router.put('/:id',(req,res)=>{
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
router.delete('/:id',(req,res)=>{
    const { id } = req.params;
    const user = users.find((elem)=> elem.id === id);
    if (!user){
        return res.status(404).json({
            success: false,
            message: "User not Found !"
        });
    }
    user_index = users.indexOf(user);
    users.splice(user_index,1);

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
        data: users,
    });
});


module.exports = router;