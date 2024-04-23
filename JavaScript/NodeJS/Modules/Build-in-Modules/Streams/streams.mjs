import http from 'http'
import fs from 'fs'

const server =http.createServer(function (req, res) {
    const filestream = fs.createReadStream('./data.txt','utf-8')
    filestream.on('open',()=>{
        filestream.pipe(res)
    })  
    filestream.on('error',(err)=>{
        console.log(err);
    })  
})
server.listen(3003)