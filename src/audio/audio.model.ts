import mongoose, { Schema, model  } from "mongoose";

// audio schema
const AudioSchema: Schema = new Schema({ 
     audioUrl: { type: String, required: true}

})


export const AudioModel = model('Audio', AudioSchema);