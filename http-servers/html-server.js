/* TODO:
    1) Sen content-type to html
    2) Read (readfileSync) an index.html with fs module, replace message with a real text message
    3) Send the response
    4) Change readFileSync to be a readable stream and pipe it to response stream
*/ 
const server = require('http').createServer();
const fs = require('fs');
const { Transform } = require('stream');

const setWelcomeMessage = new Transform({
    transform(chunk, encoding, callback) {
        const welcomeMessage = "Hello World";
        const regex = /{message}/gi;
        const indexHtml = (chunk.toString('utf8')).replace(regex, welcomeMessage);
        this.push(indexHtml);
        callback();
    }
});

server.on('request', (req, res) => {
    //1) Using readFileSync
    // let indexHtml = fs.readFileSync('./index.html', { encoding: 'utf8'});
    // const welcomeMessage = "Hello World";
    // const regex = /{message}/gi;
    // indexHtml = indexHtml.replace(regex, welcomeMessage);
    const {url, method} = req;
    req.on('error', (err) => {
        console.error(err);
    });
    res.on('error', (err) => {
        console.error(err);
    })
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    if (method === "GET") {
        const reader = fs.createReadStream('./index.html');
        reader.pipe(setWelcomeMessage).pipe(res);
    }
})
.listen(3000);
