import mongoose, { Schema, model  } from "mongoose";

// category schema
const CategorySchema: Schema = new Schema({ 
     name: { type: String, required: true},
     imageUrl: {type: String}

})


export const CategoryModel = model('Category', CategorySchema);