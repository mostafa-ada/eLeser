import mongosse from "mongoose";
import "dotenv/config";
// conncet func to cloud mongoDB
export function connectionDB (){
    mongosse.connect( `${process.env.MONGO_URI}`, { useNewUrlParser: true } )
    .then( () => {
      console.log('cloud MongoDB is connected!!');
    }).catch( e => console.log(e))
    
}


