const http = require('http')

const server = http.createServer()

console.log('test');


server.on('request', (req, res) => {
    console.log('ohoho');
    res.write('yeesss!!')
    res.end()
})

server.listen(3001)
