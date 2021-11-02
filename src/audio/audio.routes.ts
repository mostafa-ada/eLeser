import express from "express";
import * as Audiocontroller from "./audio.controller";
export const audioRoutes = express();
import { upload as uploadSound } from "../../uploadsound";
import JSONResponse  from '../JSONResponse';

// add audio
audioRoutes.post('/audio/upload', uploadSound.single('audioUrl'), async (req, res) => {
    console.log(req.file);

    await Audiocontroller.addAudio(req.file)
        .then(th => {
            res.json(th);
        }).catch(e => { res.json(e) })

});
// get all audios
audioRoutes.get('/audio/get/all', async (req, res) => {
    //
    await Audiocontroller.findAll(req.params._id)
        .then(th => {
            res.json(th);
        }).catch(e => { throw new Error(e) })

})

// get one audio by id
audioRoutes.get("/audio/:_id", async (req, res) => {
    await Audiocontroller.findOne(req.params._id)
        .then(th => {
            res.json(th);
        }).catch(e => { throw new Error(e) })
})
// update
audioRoutes.put('/audio/update/:_id', uploadSound.single('audioUrl'), async (req, res) => {
    //
    await Audiocontroller.update(req.params._id, req.file)
        .then(th => {
            res.json(th);
        }).catch(e => { res.json(e) })
});



// delete"
audioRoutes.delete("/audio/delete/:_id", async (req, res) => {
    //
    await Audiocontroller.remove(req.params._id)
        .then(th => {
            res.json(th);
        }).catch(e => { throw new Error(e) })

});