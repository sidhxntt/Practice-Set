import { JSON_DATA_1, JSON_DATA_2 } from '../OS.mjs';
import fs from 'fs' ;

// All this example of file writing in a synchronus way 
fs.writeFileSync('CPU_data.json',JSON_DATA_1);
fs.writeFileSync('Network_Interface_data.json',JSON_DATA_2);
fs.writeFileSync('README.md',mystr);

try {
    const data=fs.readFileSync('CPU_data.json','utf-8')
    console.log(data)
} catch (error) {
    console.log(error)
}
