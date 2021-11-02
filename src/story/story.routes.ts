import express from "express";
import fs from 'fs';
import HandleDataJson  from "./../../handelDatajson";
import * as story_Controller from "./story.controller";
export const storyRoutes = express();
import {upload} from "../../uploadimg";
import JSONResponse  from '../JSONResponse';


// add all data from json file
storyRoutes.post('/story/addall/json', async (req,res) => {

    //let rowdata = fs.readFileSync('./data/fakedata.json');
    //let st = JSON.parse(rowdata.toString());
    /*const dt = await storyFromJson('story')
    .then( th => res.json(th))
    .catch(e => console.log(e));*/
    const result = story_Controller.addjsondata().then( th => res.json(th));
    return result;
   

});

// update data from json file
storyRoutes.put('/story/updatefrom/json', async (req, res)=> {
  return await story_Controller.updateFromJsonData().then(th => res.json(th));
   
});


// get all
storyRoutes.get('/story/getall', async (req, res) => {
  await story_Controller.findAll()
  .then ( th => res.json(th))
  .catch( e => res.json(e));
});

// get one
storyRoutes.get('/story/getone/:_id', async (req, res) => {
    await story_Controller.findOne(req.params._id)
    .then ( th => res.json(th))
    .catch( e => res.json(e));
  });

// post: create one story
storyRoutes.post('/story/add', upload.single('photoUrl'), async (req, res) => {
  const photoUrl_ = `http://localhost:5000/storyimg/${req.file.filename}`
  req.body.photo = [ {photoUrl: photoUrl_}];
    await story_Controller.create(req.body)
    .then ( th => res.json(th))
    .catch( e => res.json(e));

});

// post: search fullText
storyRoutes.post('/story/search', async (req, res)=> {
  await story_Controller.search(req.body)
  .then ( th => res.json(th))
  .catch( e => res.json(e));
});

// update one: add category_id,audio_id
storyRoutes.put('/story/update/:_id', async (req, res) => {
 const result_1= await story_Controller.updateOne(req.params._id, req.body)
  .then ( th => res.json(th))
  .catch( e => res.json(e));
  // 
 
  res.json(result_1);
});
// update one: text
storyRoutes.put('/story/update/text/:_id',async (req, res) => {
 const result_1= await story_Controller.updateAnotherData(req.params._id, req.body)
  .then ( th => res.json(th))
  .catch( e => res.json(e));
  // 
  return result_1;
});


// updateMany for rename language
storyRoutes.put('/story/rename/language', async (req, res) => {
  await story_Controller.rename()
  .then ( th => res.json(th))
  .catch( e => res.json(e));
});
// add new Field
storyRoutes.put('/story/addField', async (req, res) => {
  await story_Controller.addNewField()
  .then ( th => res.json(th))
  .catch( e => res.json(e));
});


// delete one
storyRoutes.delete('/story/delete/one/:_id', async (req, res) => {
  await story_Controller.deleteOne(req.params._id)
  .then ( th => res.json(th))
  .catch( e => res.json(e));
});
// delete more
storyRoutes.delete('/story/delete/more/:_idList', async (req, res) => {
  await story_Controller.deleteMany([req.params._idList])
  .then ( th => res.json(th))
  .catch( e => res.json(e));
});

// delete one story
storyRoutes.delete('story/delete/one/:_id', async (req, res) => {
  await story_Controller.deleteOne(req.params._id)
  .then ( th => res.json(th))
  .catch( e => res.json(e));

});

// delete many stories and IDs in Array
storyRoutes.delete('story/delete/one/:_id', async (req, res) => {
  const idList = [req.params.id]; 
  await story_Controller.deleteMany(idList)
  .then ( th => res.json(th))
  .catch( e => res.json(e));

});