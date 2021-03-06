"use strict";

var express = require('express');
var bodyParser = require('body-parser');
const APIResponse = require('./server/helpers/APIResponse');
const httpStatus = require('http-status');
// const processImage = require('express-processimage');
var database = require("./database");
const cors = require('cors');
const path = require('path');
var http = require('http');


var app = express();

//CORS Middleware
app.use(cors({ origin: true }));

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

const imagesRoot = path.join(__dirname, '..', 'uploads');
// app.use(processImage({ root: imagesRoot }));
app.use('/uploads', express.static(imagesRoot));

app.use('/uploads', express.static(process.cwd() + '/uploads'));

app.use((req, res, next) => {
    // console.log("req",req)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

var port = process.env.port || 3000
app.listen(port, () => {
    console.log("Server running on port", port);
});

// var server = http.createServer(app).listen(port, function () {
//     console.log('Http App started on', port);
// });

function setupRoutes() {
    const routes = require("./routes");
    routes.setup(app);
}

setupRoutes();
module.exports = app;


