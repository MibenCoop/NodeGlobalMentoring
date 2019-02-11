const server = require('http').createServer();
server  
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        req.pipe(res);
    })
    .listen(3000);

//For testing we can use     curl -d 'sample data' http://localhost:3000