const model = require('../models/friends.model');



function postFriend(req,res){
    if (!req.body.name){
        return res.status(400).json({
            error:'missing friend name'
        });
    }
    const newFriend = {
        name:req.body.name,
        id: model.length

    };
    model.push(newFriend);
    res.json(newFriend);
};

function getFriends(req,res){
    res.json(model);
};
function getFriend(req,res){
    const friendId = Number(req.params.friendId);
    const friend = model[friendId];
    if (friend){
        res.json(friend);

    }else{
        res.status(404).json({error: 'freind does not exist'});
    }
};


module.exports =  {
    postFriend,
    getFriends,
    getFriend
}