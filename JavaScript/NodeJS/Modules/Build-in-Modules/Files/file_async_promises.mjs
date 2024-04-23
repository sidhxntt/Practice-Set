import fs from  'fs';
import utils from 'util'

const read_file=utils.promisify(fs.readFile)

async  function getData(){
  try {
    const data =await read_file('CPU_data(async).json','utf-8')
    console.log(JSON.parse(data));
  } catch (error) {
    console.log(error)
  }
}
getData();