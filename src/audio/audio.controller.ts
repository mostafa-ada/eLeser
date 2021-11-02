import { AudioModel } from "./audio.model";


// upload photo
export const addAudio = async (data: any) => {

    const audioUrl_ = `http://localhost:5000/audio/${data.filename}`
    return await AudioModel.create({
        audioUrl: audioUrl_
    });
}
//
export const findAll = async (_id: any) => {
    return await AudioModel.find();

}
 

// get one photo by id
export const findOne = async (_id: any) => {
    return await AudioModel.findById(_id);

}
 

//
// update
export const update = async (_id: any, data: any) => {
    console.log('data audio:', data);
 
    const audioUrl_ = `http://localhost:5000/audio/${data.filename}`
    return await AudioModel.findByIdAndUpdate(_id,{
       $set: { audioUrl: audioUrl_ }
    });

}


// delete
export const remove = async (_id: any) => {
    //
    console.log('audio _id before delete: ', _id);
    //
    return await AudioModel.deleteOne(_id);
} 