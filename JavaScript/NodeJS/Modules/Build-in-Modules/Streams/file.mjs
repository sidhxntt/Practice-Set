import fs from "fs";
import { promisify } from "util"; 

const writeFile = promisify(fs.writeFile);
async function writeData() {
  try {
    let mystr = "";
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        mystr += `${i}${j}\n`; 
      }
    }
    await writeFile('data.txt', mystr, { flag: "a" }); 
  } catch (error) {
    console.log(error);
  }
}

writeData(); 