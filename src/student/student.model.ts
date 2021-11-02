import mongoose, { Schema, model  } from "mongoose";

// story schema
const StudentSchema: Schema = new Schema({
     uuid: { type: String, required: true}, 
     userName: { type: String, required: true},
     password: { type: String, required: true},
     firstName:{type: String},
     lastName:{type: String},
     email:{type: String},
     Eltern_Email: {type: String},
     age: { type: String},
     city: { type: String},
     zip: { type: String},
     country: { type: String},
     lng: { type: String},
     lat: { type: String},
     reading_level: { type: String},
     languages_: {type: Array},

     story: { type: Array}, // ref
     //story_docs: {type: Array},
     photo: { type: Array},  // ref
     // photo_docs: { type: Array},
     interesting: { type: Array}, // ref=>Category
      // interesting_docs:{ type: Array},
     tags:{type: Array},
     login:[
          {
              
               login_at: {type: String},
               is_login: {type: String},
               created_at:{type: String}
          }
     ],
     logout:[
          {
              
               logout_at: {type: String},
               is_logout: {type: String},
               created_at:{type: String}
          }
     ],
     school_name:{type: String},
     audio:[
          { 
            audioUrl: { type: String}                
          }
     ],
     audio_playlist:{type: Array}, // ref
     Profile:[
          {
                    isDeleted: { type: String},
                    deleted_at:{ type: String},
                    created_at:{ type: String},
                    updated_at:{ type: String},
          }
     ],
     editing:[
           { story: {type: String } }, // ref
           { audio: {type: String } }, // ref
           { words: 
               [
                    {
                         word:{type: String},
                         status:{type: String}
                    }
               
                 ]
               }
          ],
        

          


     


})
export const StudentModel = model('Student', StudentSchema);