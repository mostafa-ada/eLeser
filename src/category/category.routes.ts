import { CategoryModel } from "./category.model";
import * as catController from "./category.controller";
import express from "express";
import JSONResponse from '../JSONResponse';
import {upload} from "../../uploadimg";

export const catRoutes = express();





// all json
catRoutes.get('/category/json', async (req, res) => {
    //const result = await catController.addFromJson() 
    //.then( th => res.json(th))


});


// get all
catRoutes.get('/category/all', async (req, res) => {
    //
    try {

        const result = await catController.findAll()
            .then(th => {
                //
                JSONResponse.success(req, res, null, th);
            });
    } catch (err) {
        //
        JSONResponse.serverError(req, res, null, null);
    }
});

// get one category by id
catRoutes.get('/category/one/:_id', async (req, res) => {
    //
    /*
    await catController.findOne(req.params._id)
        .then(th => res.status(200).json(th))
        .catch(e => res.status(500).json(e));
        */
    // 
    try {

        const result = await catController.findOne(req.params._id)
            .then(th => {
                //
                JSONResponse.success(req, res, null, th);
            });
    } catch (err) {
        //
        JSONResponse.serverError(req, res, null, null);
    }

});
// get one category by Name
catRoutes.get('/category/one/name/:_name', async (req, res) => {
    try {
        const name_ = req.params._name;
        //
        console.log('name_: ', name_);
        //
        const result = await catController.findOneByName(name_)
            .then(th => {
                //
                JSONResponse.success(req, res, null, th);
            });
    } catch (err) {
        //
        JSONResponse.serverError(req, res, null, null);
    }

});

// add one
catRoutes.post('/category/add',  upload.single('imageUrl'), async (req, res) => {
    //
    try {
        //
        await catController.createOne({file: req.file, name: req.body.name})
        .then(th => {
            //
            JSONResponse.success(req, res, null, th);
        })
        
    } catch (error) {
        JSONResponse.serverError(req, res, null, null);
    }
  
        

});

// update
catRoutes.put('/category/update/:_id', upload.single('imageUrl'), async (req, res) => {
    //
    try {
        //
        await catController.updateOne(req.params._id, req.file, req.body.data)
        .then(th => {
            JSONResponse.success(req, res, null, th);
        })
        //




    } catch (error) {
        //
        JSONResponse.serverError(req, res, null, null);
    }
    
});


// delete
catRoutes.delete("/category/delete/:_id", async (req, res) => {
    //
    /*
    await catController.deleteOne(req.params._id)
        .then(th => {
            res.json(th);
        }).catch(e => { throw new Error(e) });
        */
    //
    try {

        const result = await catController.deleteOne(req.params._id)
            .then(th => {
                //
                JSONResponse.success(req, res, null, th);
            });
    } catch (err) {
        //
        JSONResponse.serverError(req, res, null, null);
    }
});