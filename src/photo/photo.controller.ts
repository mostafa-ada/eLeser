import { PhotoModel } from "./photo.model";
import { upload } from "../../uploadimg";

import * as filestack from 'filestack-js';

// key
const client = filestack.init('ArAOYgJxBRaWm2qxQYdRWz');


// upload photo
export const addPhoto = async (data: any) => {
    console.log('data photo:', data);

    const photoUrl_ = `http://localhost:5000/profileimg/${data.filename}`;
    const photoUrl_story = `http://localhost:5000/storyimg/${data.filename}`;

    /* return await PhotoModel.create({
         photoUrl: photoUrl_
 
     });*/
    // 
    client.upload(data.path)
        .then(async (th) => {
            //
            console.log('filestack: ', th);
            //
            return await PhotoModel.create({
                name: data.name,
                photoUrl_cl: th.url,
                photoUrl: photoUrl_
            });
        }).catch((e) => {
            console.log('error:', e);
        });
}
//
export const findAll = async () => {
    //
    return await PhotoModel.find();
}

// get one photo by id
export const findOne = async (_id: any) => {
    return await PhotoModel.findById(_id);

}

// update
export const update = async (_id: any, data: any) => {
    console.log('data photo:', data);

    const photoUrl_ = `http://localhost:5000/profileimg/${data.filename}`

    client.upload(data.path)
        .then(async (th) => {
            //
            console.log('filestack: ', th);
            //
            return await PhotoModel.findByIdAndUpdate(_id, {
                $set: {
                    photoUrl_cl: th.url,
                    photoUrl: photoUrl_
                }
            });
        }).catch((e) => {
            console.log('error:', e);
        });



}

//

// delete
export const remove = async (_id: any) => {
    //
    console.log('photo _id before delete: ', _id);
    //
    return await PhotoModel.deleteOne(_id);
} 
