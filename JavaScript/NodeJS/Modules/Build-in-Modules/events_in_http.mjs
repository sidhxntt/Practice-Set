//alerternative way for the code in http.mjs
import http  from 'http';

const server= http.createServer();
server.on( "request", (req, res) => {
    res.end(`Hello World!`);
})
server.listen(3002)
