import http from 'http';
const PORT = 3000;
const friends = [
    {
        id : 0,
        name: 'zac'
    },
    {
        id : 1,
        name: 'cp'
    }
]

const server = http.createServer();
server.on('request', ((req, res)=>{
    const items = req.url.split('/');
    if (items[1]==='friends'){
        res.statusCode = 200;
        res.setHeader('content-Type', 'application/json');
        if (items.length===3){
            res.end(JSON.stringify(friends[Number(items[2])]));
        }else{
            res.end(JSON.stringify(friends));
        }
    }else{
        res.statusCode = 404;
        res.end();
    }
}));


server.listen(PORT, ()=>{
    console.log('now listening to port ', PORT);
});