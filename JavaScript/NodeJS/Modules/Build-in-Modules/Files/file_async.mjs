import { JSON_DATA_1, JSON_DATA_2 } from '../OS.mjs';
import fs from 'fs' ;

// All this example of file writing in a asynchronus way 
// fs.writeFile('CPU_data(async).json',JSON_DATA_1,(error)=>{
//     if(err)
//         console.log(error)
//     else{
//         console.log('CPU_data.json has been written successfully.');
//     }
// })

fs.readFile('CPU_data(async).json','utf-8', (err , data )=>{
    if(err){
        return console.log(err);
    }else{
      let CPUData = JSON.parse(data);
      console.log(CPUData)
    }
})