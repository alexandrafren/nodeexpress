const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan('dev'))
app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next();
})

app.get('/dishes', (req,res,next) => {
    res.end("Will send all the dishes to you");
})

app.post('/dishes', (req, res, next) => {
    res.end("Will add that dish for you" + req.body.name + req.body.description);
})

app.put('/dishes', (req,res,next) => {
    res.end("PUT not supported on dishes")
    res.statusCode = 404;
})

app.delete('/dishes', (req,res,next) => {
    res.end("deleting all the dishes")
})

app.get('/dishes/:dishId', (req,res,next) => {
    res.end("Will send that dish to you" + req.params.dishId);
})

app.post('/dishes/:dishId', (req, res, next) => {
    res.end("POST is not supported with a specific dish");
    res.statusCode = 404;
})

app.put('/dishes/:dishId', (req,res,next) => {
    res.write("Updating that dish for you " + req.params.dishId)
    res.end("Updated dish " + req.body.name + req.body.description)
})

app.delete('/dishes/:dishId', (req,res,next) => {
    res.end("I will delete that dish for you " + req.params.dishId)
})

app.use(express.static(__dirname+ '/public'))

app.use((req,res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
})


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})