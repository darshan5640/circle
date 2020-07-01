"use strict";

const Circle = require("./circle.model");
const httpStatus = require('http-status');
const APIResponse = require('../../helpers/APIResponse');

class CircleController {

    async add(req, res, next) {
        let model = new Circle(req.body);

        try {
            let response = await model.save();

            return res.status(httpStatus.OK).json(new APIResponse(response, 'Circle added successfully', httpStatus.OK));
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, 'Error adding circle', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }

    async getById(req, res, next) {
        let id = req.params.id;

        try {
            let response = await Circle.findById(id);
            if (response) {
                return res.status(httpStatus.OK).json(new APIResponse(response, 'Circle fetched successfully', httpStatus.OK));
            }
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse({}, 'Circle with the specified ID does not exists', httpStatus.BAD_REQUEST));

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse(null, 'Error getting circle', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }

    async getAll(req, res, next) {
        try {
            let response = await Circle.getAll();
            return res.status(httpStatus.OK)
                .json(new APIResponse(response, 'Circles fetched successful', httpStatus.OK));
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(new APIResponse({}, 'Error getting circles', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }

    async update(req, res, next) {
        let body = req.body;
        try {
            const response = await Circle.update(body);
            if (response) {
                return res.status(httpStatus.OK).json(new APIResponse(response, 'Circle updated successfully', httpStatus.OK));
            }
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse({}, 'Circle with the specified ID does not exists', httpStatus.BAD_REQUEST));

        } catch (e) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(new APIResponse(null, 'Error updating circle', httpStatus.INTERNAL_SERVER_ERROR, e));
        }
    }

    async delete(req, res, next) {
        let CircleId = req.params.id;
        try {
            let response = await Circle.delete(CircleId);
            if (response) {
                return res.status(httpStatus.OK).json(new APIResponse({}, 'Circle deleted successfully', httpStatus.OK));
            }
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse({}, 'Circle with the specified ID does not exists', httpStatus.BAD_REQUEST));

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(new APIResponse(null, 'Error deleting circle', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }
}

var exports = (module.exports = new CircleController());