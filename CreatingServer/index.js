console.log('Hello, world!');
let http = require('http');
let server = http.createServer((req,res)=>{
    res.end('Hello, world!');
})

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});