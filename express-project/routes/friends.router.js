const express = require('express');


const friendsController = require('../controllers/freinds.controller.js');

const friendsRouter = express.Router();

friendsRouter.use((req,res,next)=>{
    console.log("ip address: ", req.ip);
    next();

})



friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:friendId',friendsController.getFriend);
friendsRouter.post('/', friendsController.postFriend);

module.exports = friendsRouter;