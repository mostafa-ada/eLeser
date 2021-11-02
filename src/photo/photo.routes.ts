import express from "express";
import { PhotoModel } from "./photo.model";
import { upload } from "../../uploadimg";
import * as photo_Controller from "./photo.controller";
import JSONResponse from '../JSONResponse';

export const photoRoutes = express();


// upload photo
//
photoRoutes.post("/photo/upload", upload.single('photoUrl'), async (req, res) => {
    //
    console.log('photo req:', req.body);

    // 
    try {
        //
        await photo_Controller.addPhoto(req.file)
            .then(th => {
                //
                JSONResponse.success(req, res, null, th);
            });

    } catch (error) {
        JSONResponse.serverError(req, res, null, null);
    }



    /*PhotoModel.create({
        photoUrl: `http://localhost:5000/profileimg/${req.file.filename}`
    }).then(th => {
        res.json(th);
    }).catch(e => {throw new Error(e)});*/

    /*  res.json({
          success:1,
          profileUrl: `http://localhost:4000/profile/${req.file.filename}`
      });
      */
});

//
photoRoutes.get("/photo/:_id", async (req, res) => {
    
    try{ 
        await photo_Controller.findOne(req.params._id)
        .then(th => {
            JSONResponse.success(req, res, null, th);
        });
    }catch(error) {
        //
        JSONResponse.serverError(req, res, null, null);

     }
});
//@ts-check// get all
photoRoutes.get('/photo/get/all', async (req, res) => {
    //
    try {

        const result = await photo_Controller.findAll()
            .then(th => {
                //
                JSONResponse.success(req, res, null, th);
            });
    } catch (err) {
        //
        JSONResponse.serverError(req, res, null, null);
    }
});
// update
photoRoutes.put("/photo/update/:_id", upload.single('photoUrl'), async (req, res) => {
    console.log(req.file);
    //    
    await photo_Controller.update(req.params._id, req.file)
        .then(th => {
            res.json(th);
        }).catch(e => { throw new Error(e) })

});

// delete
photoRoutes.delete("/photo/delete/:_id", async (req, res) => {
    //
    await photo_Controller.remove(req.params._id)
        .then(th => {
            res.json(th);
        }).catch(e => { throw new Error(e) })

});
