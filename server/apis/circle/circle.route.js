const CircleController = require('./circle.controller');
var router = require("express").Router();
const APIResponse = require('../../helpers/APIResponse');
const httpStatus = require('http-status');
const Joi = require('joi');

router.post("/", addValidate, CircleController.add);

router.get("/", CircleController.getAll);

router.get("/:id", IDparamRequiredValidation, CircleController.getById);

router.put("/", updateValidate, CircleController.update);

router.delete("/:id", IDparamRequiredValidation, CircleController.delete);

const addValidation = Joi.object().keys({
    json: Joi.string().required().error(new Error('json is required!'))
}).unknown();

const updateValidation = Joi.object().keys({
    _id: Joi.string().required().error(new Error('_id is required!'))
}).unknown();

function addValidate(req, res, next) {
    const Data = req.body;
    Joi.validate((Data), addValidation, (error, result) => {
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
        } else {
            return next();
        }
    });
}

function updateValidate(req, res, next) {
    const Data = req.body;
    Joi.validate((Data), updateValidation, (error, result) => {
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
        } else {
            return next();
        }
    });
}

function IDparamRequiredValidation(req, res, next) {
    if (req.params && req.params.hasOwnProperty('id')) {
        next();
    } else {
        return res.status(httpStatus.BAD_REQUEST)
            .json(new APIResponse(null, 'id param not found', httpStatus.BAD_REQUEST));
    }
}

module.exports = router;