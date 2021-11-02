import mongoose, { Schema, model  } from "mongoose";

// photo schema
export const PhotoSchema: Schema = new Schema({ 
     photoUrl: { type: String, required: true},
     photoUrl_cl: { type: String}

})


export const PhotoModel = model('Photo', PhotoSchema);