/*TODO: 
-Set ​Content-Type​​ header to deal with JSONi
-Take the following sample and send it as a JSON response:
*/
const server = require('http').createServer();

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
}
server
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/json'
        })
        const jsonData = JSON.stringify(product);
        res.end(jsonData);
    })
    .listen(3000);