const fs= require('fs').promises

async function getData(){
    let Data;
    try {
        const data = await fs.readFile('/Users/siddhantgupta/Desktop/SID/Local Projects/WEB2.0/Back End/APIs/API without schema/API 2 (without db)/exchanges.json', 'utf-8')
         Data= JSON.parse(data)
    } catch (error) {
       console.log(error.message) 
    }
    return Data
}
module.exports= getData