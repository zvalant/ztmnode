
const path = require('path');


function getMessages(req,res){
    res.render('messages',{
        title: 'Messages to my friends!',
        friend: 'Elon Musk',
    })
};


function postMessage(req,res){
    console.log('updating messages...');
}

module.exports = {
    getMessages,
    postMessage,
}