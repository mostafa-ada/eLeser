import { CategoryModel } from "./category.model";
import HandleDataJson from "./../../handelDatajson";
import * as filestack from 'filestack-js';

// key
const client = filestack.init('ArAOYgJxBRaWm2qxQYdRWz');


// copy json into mongodb
export const addFromJson = async () => {

    const handel = new HandleDataJson('category');
    await handel.dataFromJson()
        .then(th => {
            //console.log('th', th);
            for (let i = 0; i < th.length; i++) {
                let dat = {
                    _id: th[i]._id,
                    name: th[i].category_name
                };
                console.log('loop i:', dat);
                // insert into mongoDB
                CategoryModel.create(dat);


            }


        }).catch(e => console.log(e))

};

// get all
export const findAll = async () => {
    return await CategoryModel.find();
}

// get one category by id
export const findOne = async (_id: any) => {
    return await CategoryModel.findById(_id);
}
// get one category by name
export const findOneByName = async (name: any) => {
    //

    //
    return await CategoryModel.find({ name: name });
}

// add one
export const createOne = async (data: any) => {
    console.log('new category data wiwth image:',data.file, data.name);
    //
    const imageUrl_ = `http://localhost:5000/categoryimg/${data.file.filename}`
    //
    /*return await CategoryModel.create({
        name: data.name,
        imageUrl: imageUrl_
    });*/
    //
    client.upload(data.file.path)
        .then(async (th) => {
            //
            console.log('filestack: ', th);
            //
            return await CategoryModel.create({
                    name: data.name,
                    imageUrl: th.url
                
            });

        }).catch((e) => {
            console.log('error:', e);
        })
    
}

// update one
export const updateOne = async (_id: any, file: any, data: any) => {
    console.log('data photo:', file);
    //
    const imageUrl_ = `http://localhost:5000/categoryimg/${file.filename}`;
    const file_v = '' + file.filename + '';
    console.log('file_v:', file_v);
    // file path
    // const path_ = file.destination + '/' + file.fielname;
    // upload file on filestack cloud
    client.upload(file.path)
        .then(async (th) => {
            //
            console.log('filestack: ', th);
            //
            return await CategoryModel.findByIdAndUpdate(_id, {
                $set: 
                {

                    imageUrl: th.url
                }
            });

        }).catch((e) => {
            console.log('error:', e);
        })

}


// delete one
export const deleteOne = async (_id: any) => {
    //
    console.log('audio _id before delete: ', _id);
    //
    return await CategoryModel.deleteOne(_id);

}

