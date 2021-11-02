import { StoryModel } from "./story.model";



export default class StoryInteractions{
    // values
 private readonly field_Name: String;
 private readonly field_Value: any;
 private readonly _id: any;   

 // constructor
constructor(_id: any, fieldName: String,fieldValue: any) {
 
     // initializer for the Values
     this.field_Name = fieldName;
     this.field_Value = fieldValue;
     this._id = _id;


}

// insert IDs
async insertIDs() {
    
    // student
    if(this.field_Name === 'student')
    {
        const data = { _id: this._id, field: this.field_Name, value: this.field_Value}
        console.log('data: ',data);
       const st = await StoryModel.findByIdAndUpdate(this._id,{
        $push:{
            student: this.field_Value
          }
       });
    }
    // category
    
    if(this.field_Name === 'category')
    {
        const data = { _id: this._id, field: this.field_Name, value: this.field_Value}
        console.log('data: ',data);

       
       const cat = await StoryModel.findByIdAndUpdate(this._id,{
        $push:{
            category: this.field_Value
          }
       });
       
    }
    // 
    if(this.field_Name === 'audio')
    {
        const data = { _id: this._id, field: this.field_Name, value: this.field_Value}
        console.log('data: ',data);
        
       const audio = await StoryModel.findByIdAndUpdate(this._id,{
        $push:{
            audio: this.field_Value
          }
       }); 
       
    }

    
  return true;
}
//

// add uniuq id
public async CheckAddUniqId (p_Id: any, f_Id: any, fieldName: any) {
    // check if categoy_Id is Array
    if (Array.isArray(f_Id)) {
        console.log('audio_Id is array');
        for (let iD of f_Id) {
            console.log('iD:', iD);
            // check if every id is existing
            const story_audio = await StoryModel.exists({ "audio": iD }, async (err, cb) => {
                if (err) console.log('err:', err);
                // callback
                if (cb) {
                    console.log('f_Id' + iD + ' is already existing!: ', cb);
                } else {
                    console.log('f_Id' + iD + ' is not existing!: ', cb);
                    // push id
                    if (fieldName === 'category') {
                        const sCategory = await StoryModel.findByIdAndUpdate(p_Id, {
                            $push: {
                                category: iD
                            }
                        });
                    }
                    if (fieldName === 'audio') {
                        const sAudio = await StoryModel.findByIdAndUpdate(p_Id, {
                            $push: {
                                audio: iD
                            }
                        });
                    }


                }
            });

        }

    } else {
        console.log('category is not array');
        // push f_Id
        //
        if (fieldName === 'category') {
            const sCategory = await StoryModel.findByIdAndUpdate(p_Id, {
                $push: {
                    category: f_Id
                }
            });
        }
        //
        if (fieldName === 'audio') {
            const sAudio = await StoryModel.findByIdAndUpdate(p_Id, {
                $push: {
                    audio: f_Id
                }
            });
        }
    }


}


}
