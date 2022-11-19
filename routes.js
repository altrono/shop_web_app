const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    
    }
    
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            console.log('new');
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            
        //    Writting a file Sync way
        //    fs.writeFileSync('message.txt', message);
        //    res.statusCode = 302;
        //    res.setHeader('Location', '/');
        //    return res.end();
    
        //    Writting file 
        fs.writeFile('mymessage.txt', message, err => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    
        });
    
    }
    
    
    // Sending Response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('/<html>');
    res.end();
};

exports.handler = requestHandler;