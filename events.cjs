const EventEmitter = require('node:events');
const celeb =  new EventEmitter;

celeb.on('race win', ()=>{
    console.log("WIN!");
});

celeb.emit('race win');

process.on('exit', (code)=>{
    console.log('Process exit event with code: ', code);
});