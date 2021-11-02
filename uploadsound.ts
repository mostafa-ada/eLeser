const multer = require('multer');
const path = require('path');
//import { diskStorage } from 'multer';
//import * as path from 'path';

//
const storage = multer.diskStorage({
    destination: './upload/audio',
    filename: (req: any, file: any, cb: any)=>{
         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

 export const upload = multer({
    storage: storage,
});

