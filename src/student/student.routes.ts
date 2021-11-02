import express from "express";
import * as st_Controller from "./student.controller";
import JSONResponse  from '../JSONResponse';

export const stRoutes = express();


stRoutes.get('/student/add/all/json', async (req, res) => {
    //const result = st_Controller.addFromJson().then( th => res.json(th));
});

// get all
stRoutes.get('/student/all', async (req, res) => {
    await st_Controller.findAll()
    .then( th => res.json(th))
    .catch(e => res.json(e));

});

// get one
stRoutes.get('/student/:id', async (req, res) => {
    await st_Controller.findOne(req.params.id) 
    .then( th => res.json(th))
    .catch(e => res.json(e));

});

// post: add student
stRoutes.post('/student/add', async(req, res) => {
    await st_Controller.addOne(req.body)
    .then( th => res.json(th))
    .catch(e => res.json(e));

});

// update
stRoutes.put('/student/update/:_id', async(req,res) => {
    //console.log('req.data')
    await st_Controller.updateOne(req.params._id,req.body)
    .then( th => res.json(th))
    .catch(e => res.json(e));
});

// post: login
stRoutes.post('/student/login', async (req, res) => {

    await st_Controller.login(req.body)
    .then( th => res.json(th))
    .catch(e => res.json(e));
});

//post logout
stRoutes.post('/student/logout/:_id', async (req, res) => {
    await st_Controller.logout(req.params._id)
    .then( th => res.json(th))
    .catch(e => res.json(e));

});

// settings: change password
stRoutes.put('/student/change/password/:_id', async (req, res) => {
    await st_Controller.updatePassword(req.params._id, req.body)
    .then( th => res.json(th))
    .catch(e => res.json(e));

});

// delete
stRoutes.delete('/student/delete/:_id', async(req ,res) => {
    //
    await st_Controller.deleteOne(req.params._id)
    .then( th => res.json(th))
    .catch(e => res.json(e));

})