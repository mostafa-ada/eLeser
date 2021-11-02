import { Schema } from "mongoose";
import HandleDataJson from "./../../handelDatajson";
import { StoryModel } from "./story.model";
import { v4 as uuidv4 } from "uuid";
import { StudentModel } from "../student/student.model";
import { memoryStorage } from "multer";
import { checkServerIdentity } from "tls";
import StoryInteractions from "./story.interactions";
import { fileURLToPath } from "url";
import { PhotoModel } from "../photo/photo.model";
import { CategoryModel } from "../category/category.model";
import { AudioModel } from "../audio/audio.model";
interface iStory {
    title: String,
    description?: String,
    content?: [
        {
            head?: any | String | undefined,
            body?: []
        }
    ]
    authorName?: String,
    language_?: String,
    wordCount?: String,
    status?: String,
    isSaved?: boolean,
    tags?: [],

    created_at?: String,
    updated_at?: String,
    category?: [],
    student?: []
    photo?: [],
    audio?: []
}

// from json into db
export const addjsondata = async () => {
    const arr_dt: iStory[] = [];

    const handel = await new HandleDataJson('stories1');
    await handel.storyFromJson()
        .then((th: iStory) => {

            const th_: iStory = th;
            //
            console.log('th:', th);

            //







            /*
            for (let el of th) {
                console.log('el:', th);
                if (el.content) {
                    for (let el2 of el.content) {
                        //console.log('el2:', el2);
                        //console.log('el2 content:', el2.content);
                        let level2: iStory = {
                            //id: el2.id,
                            title: el2.title,
                            description: el2.description,
                            authorName: el2.author,
                            wordCount: el2.wordcount,
                            language_: el2.language_,
                            content: [el2.content],
                            created_at: new Date().toISOString()
                        }

                        console.log('level2:', level2.content);
                        const res = create(level2)
                            .then(th => console.log('th-create:', th))
                            .catch((err) => console.log('err:', err))
                    }

                }
            }*/





            /*

            for (let i = 0; i < th.length; i++) {
                let dat = {
                    title: th[i].title,
                    description: th[i].description,
                    language_: th[i].language,
                    wordCount: th[i].wordcount,
                    //tags: th[i].category,
                    //category: th[i].category,
                    // isSaved: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
                //
                console.log('content:', th[i].content);

                //
                let context: any[] = [];

                for (let cont of th[i].content) {
                    // dat.content.push({head: cont.head, body: cont.body});

                    console.log('cont:', cont.content);

                    //dat.content.push({ body: cont.content.body });
                    //let obj = {head:cont.content.head, body:cont.content.body};
                    //context.push(obj);
                    console.log('context:', context);

                }
                */
            //arr_dt.push(dat);
            /*
            if(th[i].language == 'Deutsch')
            {
                dat.language = 'de';
            }
            if(th[i].language == 'Englisch')
            {
                dat.language = 'en';
            }
            */
            // console.log('dat:', dat);
            /*  create(dat)
            .then(th => {
                  console.log('created:', th._id);
              })
              .catch( e => console.log(e));*/
            //}


        });

    return arr_dt;
};
// update from json file
export const updateFromJsonData = async () => {
    const exData: any[] = [];
    const handel = await new HandleDataJson('stories1')
    const hdl = await handel.storyFromJson()
        .then((th) => {

            const th_: iStory = th;
            //console.log('th_:', th_);



            for (let el of th) {
                //console.log('el:', th);
                if (el.content) {
                    for (let el2 of el.content) {
                    }
                }
                exData.push(el);

            }
        });
    // 
    //console.log('exData:', exData);
    //
    for (let exd of exData) {
        //console.log('exd:', exd);
        const story = await StoryModel.find({ title: exd.title }, async (err, cb) => {
            if (err) console.log('err:', err);
            //
            //console.log('cb:', cb[0]);


            for (let c of cb) {
                const _id: Object = c.get('_id');
                console.log('_id:', _id);
                //console.log('c:', c.get('title'));
                //console.log('c:', c.get('wordCount'));
                /*for(let c2 of cb.content)
                {

                }*/
                for (let ex of exd.content) {
                    if (ex.content) {
                        //console.log('first ex :', ex.content);
                        for (let ex2 of ex.content) {


                            // body
                            for (let ex3 of ex2.body) {
                                console.log('head ex2:', ex2.head);
                                console.log('body ex3:', ex3);
                                console.log('---------------------');
                                const awt = await StoryModel.findByIdAndUpdate(_id, {
                                    $set: {
                                        content: {
                                            "body": [ex3]
                                        }
                                    }

                                });
                            }
                        }

                    }


                }

            }

            //


        })
    }


}



// add story
export const create = async (data: iStory) => {
    data.created_at = data.updated_at = new Date().toISOString();
    console.log('new story: ', data);
    const res = data.content || '';
    for (let iten of res) {
        console.log('iten:', iten);
    }
    //return await StoryModel.create(data);
    return true;
}


// get all stories
export const findAll = async () => {
    //
    let arr1: any[] = [];
    let arr2: any[] = [];
    //
    const stories = await StoryModel.find();
    //
    console.log('stories:', stories[0].get("_id"));
    const Ids = stories[0]?.get("_id");
    //
    stories.forEach( async (fr) => {
        //
       const ids = fr._id;
       console.log("id: ", ids);
       //
       const res = await findOne(fr._id);
       console.log("res: ", res);
       arr1.push(res);


    })

    //
    const data = { story: stories, story_: arr1 };
    //
    return data;
}

// get all stories by student id




// get one Story
export const findOne = async (_id: any) => {
    // display photos in story
    let photoDOCs: any[] = [];
    // get story by id
    let story = await StoryModel.findOne({ _id: _id }, { category_docs: 0, student: 0, audio_docs: 0 }); // 1
    //console.log('photos Ids in one story:', story?.get('photo'));
    let photos = story?.get('photo'); // 2
    //console.log('photos Ids', photos);
    // get photo by id
    let foto = await PhotoModel.findOne({ _id: photos[0] }); // 3
    //console.log('foto: ', foto);
    // loop get every element "id" from photos variable
    for (let ph of photos) // 4
    {
        //console.log('one photo ph:', ph);
        let one_Foto = await PhotoModel.findOne({ _id: ph }); // 5
        //console.log('photo Document: ', one_Foto);
        if (one_Foto) {
            photoDOCs.push(one_Foto); // 6
        }

    }
    console.log('photoDOCs: ', photoDOCs); // 7

    // display categories in story
    let categoryDocs: any[] = [];
    let categoryIDs = story?.get("category");
    console.log('categoryIDs: ', categoryIDs);
    // get one category by id
    const category = await CategoryModel.findOne({ _id: categoryIDs[0] });
    console.log('one category by id:', category);
    //
    for (let cate of categoryIDs) {
        //console.log('one category Id cate: ', cate);
        let one_Category = await CategoryModel.findOne({ _id: cate });
        //console.log('category document: ', one_Category);
        categoryDocs.push(one_Category);

    }
    //
    console.log('categoryDocs: ', categoryDocs);



    //display students in story
    let studentDOCs: any[] = [];
    const student = await StudentModel.find();
    const storyIDs = student[0].get("story");
    console.log('storyIDs: ', storyIDs);
    //
    // get one story
    const storyTB = await StoryModel.findOne({ _id: storyIDs[0] });
    //console.log('one story by id from storyIDs: ', storyTB);
    if (story?.get("_id") == storyIDs[0]) {
        console.log('story id passt: ', story?.get("_id") + '===' + storyIDs[0]);
        let stDocs = {
            _id: student[0]._id, //get("_id"),
            userName: student[0].get("userName"),
            firstName: student[0].get("firstName"),
            lastName: student[0].get("lastName")
        };
        studentDOCs.push(stDocs);
    }


    // display audio
    let audioDOCs: any[] = [];
    let audios = story?.get("audio");
    const audio = await AudioModel.findOne({ _id: audios });
    audioDOCs.push(audio);
    console.log('audiodocs: ', audioDOCs);


    // display story
    await StoryModel.findById(_id, async (err, cb) => {
        //
        const category_Id = cb?.get('category');
        const category_docs = cb?.get('category_docs');


        if (Array.isArray(category_Id)) {
            //console.log('category_Id: ', category_Id);
            for (let cat of category_Id) {
                // console.log('category_Id cat: ', cat);
                //
                const category = await CategoryModel.findById(cat, async (err, res) => {
                    if (err) console.log(err);

                    if (res) {
                        // console.log('res:', res);
                        // insert in category_docs in story
                        /* const insertInCategory_docs = await cb?.updateOne({$push:{ category_docs: res }}, async (err, callback) => {
                             if(err) console.log('error:', err);
                             //
                             if(callback) {
                                 console.log('callback category:', callback);
                             }
 
                         });*/

                    }

                });

            }

        }



    })
    /*
        let custData: any[] = [];
        //
        const story = await StoryModel.findById(_id, async (err, res) => {
    
            //
            if (err) console.log('err:', err);
            // 
            custData.push({ story: res });
            console.log('res:', res);
            // category
            const category_id = res?.get('category');
            console.log('category_id:', category_id);
            // 
            if (category_id == 0) {
                const category = await CategoryModel.findById(category_id);
                console.log('category:', category);
                custData.push({ category_docs: category });
                //
                //const update = await StoryModel.findByIdAndUpdate(_id, { $push: { category_docs: category } });
                //return update;
    
            }
    
            //
    
            for (let cat of category_id) {
                console.log('cat:', cat);
                const category = await CategoryModel.findById(cat);
                console.log('category:', category);
                custData.push({ category_docs: category });
                //
                const update = await StoryModel.findByIdAndUpdate(_id, { $push: { category_docs: category } });
    
            }
    
    
    
            console.log('custData:', custData);
            // audio
            const audio_id = res?.get('audio');
            console.log('audio_id:', audio_id);
    
            // single 
            if (audio_id === 0) {
                const audio = await AudioModel.findById(audio_id);
                const update = await StoryModel.findByIdAndUpdate(_id, { $push: { audio_docs: audio } });
                return update;
    
            }
    
            //
            for (let aud of audio_id) {
                console.log('aud:', aud);
                const audio = await AudioModel.findById(aud);
                console.log('audio:', audio);
                custData.push({ 'audio_docs': audio });
                // update
                const update = await StoryModel.findByIdAndUpdate(_id, { $push: { audio_docs: audio } });
            }
    
    
            //
            console.log('custData:', custData);
            //
    
    
    
        });
        //
        console.log('custData:', custData);
    */
    //return 'findone';
    // 
    const data = { story: story, photos: photoDOCs, categories: categoryDocs, students: studentDOCs, audios: audioDOCs };
    return data;

}
// 






// update one story: add category_id,audio_id
export const updateOne = async (_id: any, data: any) => {
    // msg
    let msg = null;
    // check student_id in Story
    //const student_Id = data.student_id;
    // check student_id in Story by func checkIDs()
    // and if it is false: insert student_id in student field in story
    //const checkStudentId = checkIDs(_id, "student", student_Id);
    //
    /*
     const story_student = await StoryModel.exists({"student":student_Id}, (err, cb) => {
         
         if(err) console.log('err:', err);
         // callback
         if(cb)
         {
           console.log('student_Id is already existing!: ', cb);
           msg = "student_Id is not existing!";
         }else{
            console.log('student_Id is not existing!: ', cb);
             msg = "student_Id is not existing!";
         }
 
     });
     // 
     console.log('story_student:', story_student);

*/


    // update
    if (data) {
        await StoryModel.findByIdAndUpdate(_id, { $set: { authorName: data.authorName } }, (err, res) => {
            if (err) console.log('error:', err);
            //
            if (res) {
                console.log('res:', res);
            }

        });

    }


    //check category_Id in Story
    const category_Id = data.category_Id;
    // check category_Id in Story by func checkIDs()
    // and if it is false: insert category_Id in category field in story
    //const checkCategoryId = checkIDs(_id, "category", category_Id);

    // check if categoy_Id is Array
    if (Array.isArray(category_Id)) {
        console.log('category is array');
        for (let iA of category_Id) {
            console.log('iA:', iA);
            // check if every id is existing
            const story_category = await StoryModel.exists({ "category": iA }, async (err, cb) => {
                if (err) console.log('err:', err);
                // callback
                if (cb) {
                    console.log('category_Id' + iA + ' is already existing!: ', cb);
                } else {
                    console.log('category_Id' + iA + ' is not existing!: ', cb);
                    // push id
                    const sCategoy = await StoryModel.findByIdAndUpdate(_id, {
                        $push: {
                            category: iA
                        }
                    });
                }
            });

        }

    } else {
        console.log('category is not array');
        // push id
        const sCategoy = await StoryModel.findByIdAndUpdate(_id, {
            $push: {
                category: category_Id
            }
        });
    }

    //
    //console.log('story_category_id:', story_category);



    //check audio_Id in Story
    const audio_Id = data.audio_Id;
    // check if audio_Id is Array: check if every id is existing
    //
    // check if caudio_Id is Array
    if (Array.isArray(audio_Id)) {
        console.log('audio_Id is array');
        for (let iD of audio_Id) {
            console.log('iD:', iD);
            // check if every id is existing
            const story_audio = await StoryModel.exists({ "audio": iD }, async (err, cb) => {
                if (err) console.log('err:', err);
                // callback
                if (cb) {
                    console.log('audio_Id' + iD + ' is already existing!: ', cb);
                } else {
                    console.log('audio_Id' + iD + ' is not existing!: ', cb);
                    // push id
                    const sAudio = await StoryModel.findByIdAndUpdate(_id, {
                        $push: {
                            audio: iD
                        }
                    });
                }
            });

        }

    } else {
        console.log('audio_Id is not array');
        // push id
        const sAudio = await StoryModel.findByIdAndUpdate(_id, {
            $push: {
                audio: audio_Id
            }
        });
    }
    // check audio_Id in Story by func checkIDs()
    // and if it is false: insert audio_Id in audio field in story

    //const checkAudioId = checkIDs(_id, "audio", audio_Id);
    //
    /*
    const story_audio = await StoryModel.exists({"audio":audio_Id}, (err, cb) => {
        if(err) console.log('err:', err);
        // callback
        if(cb)
        {
          console.log('audio_Id is already existing!: ', cb);
        }else{
           console.log('audio_Id is not existing!: ', cb);
        }
 
    });
    */

    // add photo
    /*const photo = await PhotoModel.find({}, async (err, callback) => {
        if (err) console.log(err);
        //
        for (let cb of callback) {
            let id = cb.get('_id');
            await StoryModel.update(_id, {
                $set: {
                    photo: {
                        _id: id
                    }
                }
            });
        }
 
 
 
    })*/
    // update another
    if (data) {
        const updateAnother = await updateAnotherData(_id, data);
    }
    // check if content is has data
    if (data.content) {
        //const update_content =  await updateContent(_id,data);
    }



    return true;
};
// update content
export const updateContent = async (_id: any, data: iStory) => {
    await StoryModel.findByIdAndUpdate(_id, {
        $push: {
            content: data.content
        }
    }, (err, res) => {
        if (err) console.log('error:', err);
        //
        if (res) {
            console.log('content res:', res);
        }
    });
}
// update another
export const updateAnotherData = async (_id: any, data: iStory) => {
    data.updated_at = new Date().toISOString();

    // update another data
    let anotherData: iStory = {
        title: data.title,
        description: data.description,
        //content: data.content,
        authorName: data.authorName,
        language_: data.language_,
        wordCount: data.wordCount,
        status: data.status,
        isSaved: data.isSaved,
        tags: data.tags,
        updated_at: new Date().toISOString()
    };
    //
    await StoryModel.findByIdAndUpdate(_id, {
        anotherData
    }, (err, res) => {

        if (err) console.log('error:', err);
        //
        if (res) {
            console.log('content res:', res);
        }
    });
    // push content

    /* if(Array.isArray(data.content))
     {
         console.log('content:', data.content);
         
         //
         for(let item of data.content)
         {
              console.log('item.head:', item.head);
              console.log('item.body:', item.body);
              // check if content head and body are existing
              //
         }
 
         
     }else{
         console.log('no!!');
     }*/

    //
    //console.log('anotherData:', anotherData);
    // update

    /*  return await StoryModel.findByIdAndUpdate(_id, {authorName: data.authorName}, (err, res) => {
            if (err) console.log('error:', err);
            //
            if (res) {
                console.log('res:', res);
            }

        });*/



}
// add uniuq id
const CheckAddUniqId = async (p_Id: any, f_Id: any, fieldName: any) => {
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

// func check Ids
const checkIDs = async (_id: any, fieldName: String, fieldValue: any) => {
    console.log('fieldvalue:', fieldValue);

    // instance from StoryInteractions class
    let stInter = new StoryInteractions(_id, fieldName, fieldValue);
    let chk: Boolean;
    const iModel = await StoryModel.exists({ fieldName: fieldValue }, (err: any, cb: any) => {
        if (err) console.log('err:', err);
        // callback
        if (cb) {
            console.log(`${fieldValue} is already existing!: ${cb}`);
            chk = true;
            //  
            return chk;
        } else {
            console.log(`${fieldValue} is not existing!:  ${cb}`);

            //stInter.insertIDs();
            //  check fieldName is student_id or include student 
            // and insert student_id in student in story
            //if(fieldName === 'student_id' || fieldName.includes('student'))



            //  check fieldName is category_id or include category 
            // and insert category_id in category in story
            //if(fieldName === 'category_id' || fieldName.includes('category'))



            //  check fieldName is audio_id or include audio 
            // and insert audio_id in audio in story
            //if(fieldName === 'audio_id' || fieldName.includes('audio'))

            //


            //
            chk = false;
            return stInter;
        }

    });



}


// search fullText
export const search = async (data: any) => {
    //await StoryModel.createIndexes()
    // fulltest search
    // daten fullText, category,reading_level
    const sr_ = await StoryModel.find({
        title: { $regex: new RegExp(data.fullText), $options: 'i' },
        authorName: { $regex: new RegExp(data.fullText), $options: 'i' },
        language_: { $regex: new RegExp(data.fullText), $options: 'i' },
        tags: { $regex: new RegExp(data.fullText), $options: 'i' },
        category: { $regex: new RegExp(data.category), $options: 'i' },
        reading_level: { $regex: new RegExp(data.reading_level), $options: 'i' },

    })
        .then(th => console.log('sr_ th:', th));

    //
    const sr = await StoryModel.find({
        $text: { $search: data }

        /* $or:[
             {
                 title: {$regex: data.title, $options:'$i'}  
             }
         ]*/
    })
        .then(th => console.log('th search:', th));

    console.log('sr.', sr);

    return sr;

}



// delete one story
export const deleteOne = async (_id: any) => {
    return await StoryModel.deleteOne(_id);

}

// delete many stories
export const deleteMany = async (_idList: any[]) => {
    return await StoryModel.deleteMany(_idList);
}
// updateMany for rename language to language_ and contentText to content
export const rename = async () => {
    return await StoryModel.updateMany({}, { $rename: { "language": "language_" } });
}
// updateMany for add new Field
export const addNewField = async () => {
    const action = await StoryModel.updateMany({},
        {
            $set: {
                content: [
                    {
                        head: '',
                        body: []
                    }

                ]
            }
        }
    );
    return action;
}
