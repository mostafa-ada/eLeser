
import fs from 'fs';


export default class HandleDataJson {
file_name: String;

    // constructor
    constructor (file_name: String) {
        this.file_name = file_name;
      
    }


    
// read data from json
 async storyFromJson(){
    const path ="./data/" + this.file_name + ".json";
    let rowdata = await fs.readFileSync(path);
    let st = JSON.parse(rowdata.toString());
    //console.log(st);
  
    return st;
    }

    // read data from json
 async studentFromJson(){
    const path ="./data/" + this.file_name + ".json";
    let rowdata = await fs.readFileSync(path);
    let st = JSON.parse(rowdata.toString());
    //console.log(st);
  
    return st;
    }


    async dataFromJson(){
        const path ="./data/" + this.file_name + ".json";
        let rowdata = await fs.readFileSync(path);
        let st = JSON.parse(rowdata.toString());
        //console.log(st);
      
        return st;
        }


}
