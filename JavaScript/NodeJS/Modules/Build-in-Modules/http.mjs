import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.method === 'GET') {
    // Handle GET request
    if (req.url === '/') {
      // Respond with "Hello World!" for the root URL
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write("Hello World!");
      res.end();
    } else if (req.url === '/about') {
      // Respond with "About Us" for the '/about' URL
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end("About us");
    } else {
      // Respond with 404 Not Found for other URLs
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write("404 Not Found");
      res.end();
    }
  } else {
    // Respond with 405 Method Not Allowed for non-GET methods
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.write("405 Method Not Allowed");
    res.end();
  }
});

server.listen(3001);

// res.end() basically tells the browser/client that server is done serving the response and it can close the connection to this server. Using this is must
// res.write() is to basically write data to the response body of a client's request. It can be called multiple times before res.end().
// res.writehead() is to basically write data to the response header of a client's request. We need this to basically tell our browser what kinda of data we are sending
//Due to excessive lines of code we will use express to ease our lives.