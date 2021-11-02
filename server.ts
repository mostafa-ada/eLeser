import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';
import {v4 as uuidv4 } from "uuid";
//
import { connectionDB } from "./dbConfig";
//
import { storyRoutes } from "./src/story/story.routes";
import { catRoutes } from "./src/category/category.routes";
import { audioRoutes } from "./src/audio/audio.routes";
import { stRoutes } from "./src/student/student.routes";
import { photoRoutes } from "./src/photo/photo.routes";
//

//
const app = express();
const port = process.env.PORT || 5000;
//const port2 = 3000 || process.env.PORT;

//
app.use(cors());
//app.use(express.static('./data'));
app.use(express.static('./upload'));

// middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
//
app.use('/uploadimg', express.static(path.join(__dirname, '/upload/images')));
app.use('/profileimg', express.static('./upload/images'));
app.use('/categoryimg', express.static('./upload/images'));
app.use('/storyimg', express.static('./upload/images'));
app.use('/audio', express.static('./upload/audios'));



// connect to DB
connectionDB();


// routes
app.get("/", (req, res) => {
  const uid = uuidv4();
  console.log('uuid:', uid);
  res.send({uuid:uid});
});
//
app.use("/api", storyRoutes);
//
app.use("/api", stRoutes);
//
app.use("/api", catRoutes);
//
app.use("/api", photoRoutes);
//
app.use('/api', audioRoutes);


// listen to the Server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
