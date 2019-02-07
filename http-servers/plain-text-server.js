/*TODO: 
-Set Content-type to plain text 
-Send Hellow world string as a sresponse
*/
const http = require('http');
http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-type': 'text/plain'
        })
        res.end('Hello World')
    })
    .listen(3000);
