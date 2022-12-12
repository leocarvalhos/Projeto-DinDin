"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
exports.default = validate;
