"use strict";

var config = require("./config");


exports.setup = function (app) {
    console.log("Setting up routes.");

    // https://jwt.io/introduction/
    var jwt = require("express-jwt");

    // app.use(
    //     "/api/v1", function (req, res, next) {
    //         console.log("req.originalUrl", req.originalUrl);
    //         console.log("req.headers", req.headers);
    //         console.log("req.body", req.body);
    //         console.log("req.params", req.params);
    //         next();
    //     },
    //     jwt({
    //         secret: config.tokenSecret
    //     }).unless({
    //         path: [
    //             "/api/v1/user/signup",
    //             "/api/v1/user/login",
    //             "/api/v1/admin/signup",
    //             "/api/v1/admin/login",
    //         ]
    //     })
    // );

    var circle = require("./server/apis/circle/circle.route");

    app.use("/api/v1/circle", circle);
};

module.exports = exports;
