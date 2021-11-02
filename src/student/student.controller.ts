import { Schema } from "mongoose";
import HandleDataJson from "./../../handelDatajson";
import { StudentModel } from "./student.model";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import * as crypto from 'crypto'
import { CategoryModel } from "../category/category.model";
import { StoryModel } from "../story/story.model";
import * as storyController from "../story/story.controller";
const salt = 12;


// copy from json into mongodb
export const addFromJson = async () => {
    const handel = await new HandleDataJson('students');
    await handel.studentFromJson()
        .then(th => {

            const th_ = th;


            for (let i = 0; i < th.length; i++) {
                let dat = {
                    uuid: uuidv4(),
                    userName: th[i].username,
                    firstName: th[i].firstname,
                    lastName: th[i].lastname,
                    password: bcrypt.hashSync(th[i].password, 12),
                    languages: th[i].languages,
                    reading_level: th[i].readinglevel,
                    email: th[i].email,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),

                }
                //"pmr2de232BrmWtTy"
                //const newpass = bcrypt.hashSync('pmr2de232BrmWtTy', 12)
                const bcr = bcrypt.compareSync('pmr2de232BrmWtTy', dat.password);
                if (bcr) {
                    console.log('bcr is ', bcr, ',', dat.userName, dat.password);

                }


                bcrypt.compare('pmr2de232BrmWtTy', dat.password, function (err, result) {
                    if (result == true) {
                        console.log(result, dat.userName, dat.password);
                    }
                });
                // console.log('loop i:', dat);   

                // insert into mongodb
                StudentModel.create(dat)
                    .then(th => console.log(th._id))
                    .catch(e => console.log(e));
            }



        });
}


// get all
export const findAll = async () => {
    //
    let arr: any[] = [];
    let arr2: any[] = [];
    // students
    const students = await StudentModel.find({}, { password: 0 }, async (err: any, res) => {

        if (err)
            throw new Error(err);
        //
        console.log('res>: ', res[0]._id);
        //
        const res_Data = res.forEach(async (fr) => {
            if (fr) {

               console.log("fr: ", fr._id);
               // use findone func
               const res = await findOne(fr._id);
               console.log("res: ", res);
               arr.push(res);
               // student.findeOne({_id: fr._id})
               const student = await StudentModel.findById({_id: fr._id});
               //console.log('student:----> ', student);
               const interesting_ = student?.get("interesting");
               //
                for (let intr of interesting_) {
                  //  console.log('intr: ', intr);
                    const categoryDOC = await CategoryModel.findOne({ _id: intr });
                    arr2.push(categoryDOC);
                }
                //
                const dataDocs = {st: student, interestDOCs: arr2 };
                //console.log('dataDocs:---> ', dataDocs.st?._id, dataDocs.interestDOCs);




                //const ids = fr?.get('interesting');
               // console.log("ids fr: ", ids);

                //const interestingDOC = new  CategoryModel()
               /* for (let id of ids) {
                   // console.log('id: ', id);
                    const interestingDOC = await CategoryModel.findOne({ _id: id });
                    //arr.push({ student: fr, interesting: interestingDOC });

                }*/


            }
        });
        //console.log('callback arr: ', arr);







    });
    // display interesting in students
    let interestingDOCs: any[] = [];
    const interestingIDs = students?.filter((value, index, docs) => {
        //
        const arrIDs = docs.map((m, index) => {
            m = m.get('interesting');
        });
        //
        // console.log("arrIDs: ", arrIDs);

    });
    //
    for (let st of students) {
        const interestingIDs_ = st.get("interesting");
        //
        if (st && interestingIDs_) {
            //

            // console.log('interestingIDs_: ', interestingIDs_);
            //
            let obj = { st: st };
            //
            for (let _id of interestingIDs_) {
                //console.log('_id: ', _id);
                //
                const interestingDOC = await CategoryModel.findOne({ _id: _id });
                //console.log('interestingDOC: ',interestingDOC);
                //obj.interesting =  interestingDOC;
                // interestingDOCs.push({st:obj, interesting : interestingDOC}); 

            }


        }


    }
    //
    //console.log('interestingDOCs: ',interestingDOCs);



    // display stories in students
    let storyDOCs: any[] = [];
    //









    // data
    const data = { student: students, students: arr, interesting: arr2 };
    
    // return
    return data;

};
//
// get one
export const findOne = async (_id: any) => {
    //
    let storyArr: any[] = [];

    //
    const student = await StudentModel.findById(_id,
        { password: 0, story_docs: 0, interesting_docs: 0, audio_docs: 0, category_docs: 0 }, async (err, res) => {
            if (err) {
                console.log('error:', err);
            }
            //
            const interesting_id = res?.get('interesting');
            //console.log('interesting_id:', interesting_id);
            /*
            if (interesting_id.length > 0) {
                for (let intr of interesting_id) {
                    console.log('intr:', intr);
                    const Category = await CategoryModel.findById(intr);
                    console.log('Category:', Category);
                    
                    // update
                    const update = await StudentModel.findByIdAndUpdate(_id, { $push : { interesting_docs: Category }});
                }
            } else {
                const inter = await CategoryModel.findById(interesting_id);
                console.log('audio:', inter);
                
                const update = await StudentModel.findByIdAndUpdate(_id, { $push : { interesting_docs: inter }});
    
            }
            */
            // story
            const story_id = res?.get('story');
            if (Array.isArray(story_id)) {
                for (let stoID of story_id) {
                    //console.log('stoID:', stoID);
                    //
                    //const story = StoryModel.findById(stoID)
                    //.then( th => console.log('story: ', th));
                    //
                    const ctrlStory = await storyController.findOne(stoID)
                        .then(async (th) => {
                            // console.log('story: ', th);
                            //
                            if (th) {
                                //storyArr.push(th);
                                // 
                                //const insertStory = await StudentModel.findByIdAndUpdate(_id)
                                // insert in story_docs
                                //const story_docs = res?.get('story_docs');
                                /* const insertInStory_docs = await res?.updateOne({$push:{ story_docs: th }}, async (err, callback) => {
                                      if(err) console.log('error:', err);
                                      //
                                      if(callback) {
                                          console.log('callback story:', callback);
                                      }
          
                                  });*/

                            }


                        });

                }
            }
            //
            // console.log('storyArr:', storyArr);



        });
    //
    // display story in student
    let storyDOCs: any[] = [];
    const StoryIDs = student?.get('story');
    //
    //console.log('storyIDs: ', StoryIDs);
    //
    let storyTB = await StoryModel.findOne({ _id: StoryIDs[0] });
    // console.log('storyTB: ', storyTB);
    //
    for (let sto of StoryIDs) {
        //console.log('sto: ', sto);
        let storyDOC = await StoryModel.findOne({ _id: StoryIDs[0] }, { category_docs: 0 });
        storyDOCs.push(storyDOC);
    }
    // display interesting in student
    let interestingDOCS: any[] = [];
    const InterestingIDs = student?.get("interesting");
    //console.log('interestingIDS:', InterestingIDs);
    //
    const categoryTB = await CategoryModel.findOne({ _id: InterestingIDs[0] });
    //console.log('categoryTB: ', categoryTB);
    //
    for (let intr of InterestingIDs) {
        console.log('intr: ', intr);
        const categoryDOC = await CategoryModel.findOne({ _id: intr });
        interestingDOCS.push(categoryDOC);
    }
    //






    //
    const data = { student: student, interestingDOCs: interestingDOCS, stories: storyDOCs };
    //
    return { data };

};


//
function docs_(docs: any[]) {
    //
    console.log('docs_: ', docs);
    return docs;


}


// post : add one student
// check alter und neue Daten
export const addOne = async (data: any) => {

    /*
    data.created_at = data.updated = new Date().toISOString();
    data.uuid = uuidv4();
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    */
    //return await StudentModel.create(data);
    const hash = bcrypt.hashSync(data.password, salt);

    await StudentModel.exists({ userName: data.userName }, async (err, result) => {
        if (err) {
            console.log('err:', err);
        }

        if (result) {
            console.log('result The userName is existing:', result);
            return { msg: 'cannot add The userName because it is existing' };
        } else {
            console.log('result The userName is not existing:', result);
            //return {msg:'can add The userName because it is not existing'};
            // add new student
            data.created_at = data.updated = new Date().toISOString();
            data.uuid = uuidv4();
            data.password = hash;
            return await StudentModel.create(data);
        }
    });

};



// login
export const login = async (data: any) => {
    let dat = {
        userName: data.userName,
        password: data.password
    }
    let userName = data.userName;
    let password = data.password;

    //
    const student = await StudentModel.findOne({ userName });
    // const get_st = null || student.get('password') || null;
    //const cmp = await bcrypt.compare(password, student.password);
    if (student && bcrypt.compare(dat.password, student.get('password'))) {
        console.log('student:', student);
        // insert in subdocument 'login' in parent-document 'student'
        const insert_login = await StudentModel.findByIdAndUpdate(student._id, {
            $push: {
                login: [{
                    is_login: true,
                    login_at: new Date().toISOString(),
                    created_at: new Date().toISOString()
                }]
            }

        })
        return student;

    } else {
        return 'wrong password!!';
    }

    //return student;



};

// logout
export const logout = async (_id: any) => {
    const insert_logout = await StudentModel.findByIdAndUpdate(_id, {
        $push: {
            logout: [{
                is_logout: true,
                logout_at: new Date().toISOString(),
                created_at: new Date().toISOString()
            }]
        }
    });
    return insert_logout;
}
// update 
export const updateOne = async (_id: any, data: any) => {
    //const update = await StudentModel.findByIdAndUpdate(_id, data);

    // data.interesting
    console.log('data:', data);
    //
    // compare
    const compare = await compareInteresting(_id);
    //
    const interesting = await insertInInteresting(_id, data.interesting);

    // data.story


    return compare;

}

// settings
// change password
export const updatePassword = async (_id: any, data: any) => {
    const userName = data.userName;
    const oldPassword = data.oldPassword;
    const newPassword = data.newPassword;
    console.log('data:', data);

    const student = StudentModel.findById(_id, async (err, cb) => {
        if (err) console.log('error:', err);
        //
        let password = cb?.get('password');
        console.log('password:', password);
        const cpr = bcrypt.compareSync(oldPassword, password);
        console.log('cpr:', cpr);
        if (cpr) {
            console.log('the same');
            const newHash = bcrypt.hashSync(newPassword, 12);
            console.log('newhash:', newHash);
            const student = await StudentModel.findByIdAndUpdate(_id, { $set: { password: newHash } }, (err, cb) => {
                console.log('cb:', cb?.get('password'));
            });
        } else {
            console.log('not the same');
        }
    });
    // encrypt oldpassword and
    // check if oldPassword is existing in db
    // if true set newPassword


}

// delete one
export const deleteOne = async (_id: any) => {
    //
    return await StudentModel.deleteOne(_id);

}




//----------------------------------------------------------------------------

// push categoryIDs in interesting when create new student
async function insertInInteresting(_id: any, cat_Id: any) {
    //const student = await StudentModel.exists({});
    // check if id is array
    // 1
    if (Array.isArray(cat_Id)) {
        // 2 
        for (let inter of cat_Id) {
            console.log('cat interesting:', inter);
            // 3
            // check if existing
            const student = await StudentModel.exists({ interesting: inter }, async (err, cb) => {
                // 4
                if (err) console.log('error:', err);
                //


                // 5
                // callback
                if (cb) {
                    console.log('interesting: ' + inter + ' is already existing!: ', cb);
                    //const insertcind = await insertCategoryInInterestingDocs(_id, inter);
                } else {
                    console.log('interesting: ' + inter + ' is not existing!: ', cb);

                    //6
                    // insert category ID into interesting
                    const InsertinToInter = insertIDInInteresting(_id, inter);
                    // insert category into interestinf_docs
                    //const insertcind = await insertCategoryInInterestingDocs(_id, inter);


                }


            });
        }
        return cat_Id;

    } else {
        console.log('cat interesting:', cat_Id);
    }


}


// push category ID in interesting when create new student
async function insertIDInInteresting(_id: any, inter_Id: any) {
    const insertIntoInter = await StudentModel.findByIdAndUpdate(_id, {
        $push: {
            interesting: inter_Id
        }
    }, async (err, callback) => {
        if (err) console.log('error:', err);
        //
        if (callback) {
            console.log('callback:', callback);
            // insert category into interesting_docs
            const insertin = await insertCategoryInInterestingDocs(_id, inter_Id);
            // 
            return insertin;
        }
    });
    // insert into

    //
    //  return  insertIntoInter;


}
// push category into interesting_docs
async function insertCategoryInInterestingDocs(_id: any, inter_Id: any) {
    // get category by categoryid/ every id in interesting

    await CategoryModel.findById(inter_Id, async (err, cb) => {
        if (err) console.log('error:', err);
        //
        if (cb) {
            console.log('cb category:', cb);
            // 
            const Insert_interesting_docs = await StudentModel.update(_id, { push: { interesting_docs: cb } },
                async (err, cb_) => {
                    if (err) console.log('error:', err);
                    // 
                    if (cb_) {
                        console.log('cb_ category: ', cb_)
                    }
                });
            // return 
            return Insert_interesting_docs;
        }

    })

}
// compare interesting and interesting_docs by id
async function compareInteresting(_id: any) {
    const student = await StudentModel.findById(_id, async (err, cb) => {
        let interesting = cb?.get('interesting');
        let interestingDocs = cb?.get('interesting_docs');
        if (interesting.legnth !== interestingDocs.legnth) {
            console.log('not equal: ', interesting, interestingDocs);
            //
            const insert_ = await insertCategoryInInterestingDocs(_id, cb?.get('interesting'));

        }
        if (cb?.get('interesting').legnth === cb?.get('interesting_docs').length) {
            console.log('the same');
        }

    })
}



// story
// push storyID in story when update student
async function insertInStory(_id: any, stor_Id: any) {
    // story
    if (Array.isArray(stor_Id)) {
        for (let stoID of stor_Id) {
            console.log('stoID:', stoID);
            //
            //const story = StoryModel.findById(stoID)
            //.then( th => console.log('story: ', th));
            // 
            const story = await StudentModel.exists({ story: stoID }, async (err, callback) => {
                if (err) console.log('error:', err);
                //
                if (callback) {
                    console.log('story: ' + stoID + ' is already existing!: ', callback);
                } else {
                    console.log('story: ' + stoID + ' is not existing!: ', callback);

                }

            });
        }
    }

}

// push story in story_docs when update student
async function insertIDInStory(_id: any, sto_Id: any) {
    //const insertStory = await StudentModel.findByIdAndUpdate(_id)
    // insert in story_docs
    //const story_docs = res?.get('story_docs');
    const insertInStory_docs = await StudentModel.findByIdAndUpdate(_id, { $push: { story: sto_Id } }, async (err, callback) => {
        if (err) console.log('error:', err);
        //
        if (callback) {
            console.log('callback story:', callback);
        }

    });
    // 
    const story = await StoryModel.findById(sto_Id, async (err, cb) => {
        if (err) console.log('error:', err);
        //
        if (cb) {
            console.timeLog('cb story:', cb);


        }

    })
}