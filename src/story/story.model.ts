import mongoose, { Schema, model  } from "mongoose";
import { PhotoSchema } from "../photo/photo.model";

// story schema
const StorySchema: Schema = new Schema({ 
    // uuid: {type: String, required: true},
     title: { type: String, required: true},
     description: { type: String},
     content: [{ 
          head: {type: String},
          body: {type: Array}
     }],
     contentUrl: { type: String},
     authorName: { type: String},
     language_: { type: String},
     wordCount: { type: String},
     status: { type: String},
     isSaved: { type: Boolean},
     tags: {type: Array},
     reading_level: {type: String},
     photo: [{ type: Schema.Types.ObjectId, ref:'Photo'}], //[PhotoSchema],
     student: {type: Array}, //{ type: Schema.Types.ObjectId, ref:'Student'}, // ref
     audio: {type: Array}, //{ type: Schema.Types.ObjectId, ref: 'Audio'},  // ref
     category: {type: Array}, //{ type: Schema.Types.ObjectId, ref:'Category'}, // ref
     //
     audio_docs: [],
     category_docs: [],
})
// create index for searching
StorySchema.index({title:'text',authorName:'text',language:'text', tags:'text',reading_level: 'text'});

export const StoryModel = model('Story', StorySchema);