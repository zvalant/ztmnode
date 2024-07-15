const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://zac23v:nr5YTnucJajQ6iiM@planetcluster.sfyjpky.mongodb.net/nasa?retryWrites=true&w=majority&appName=planetCluster';


async function mongoConnect(){

    await mongoose.connect(MONGO_URL);
mongoose.connection.once('open', ()=>{
    console.log('MongoDB connection ready!');
})
mongoose.connection.on('error',(err)=>{
    console.error(err);
})


}
async function mongoDisconnect(){
    await mongoose.disconnect();
}
module.exports = {mongoConnect, mongoDisconnect};