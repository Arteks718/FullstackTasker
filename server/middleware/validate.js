const createHttpError = require("http-errors");
const { NEW_USER_VALIDATION_SCHEMA, UPDATED_USER_VALIDATION_SCHEMA } = require("../utils/validationsSchemas.js");

module.exports.validateUserOnCreate = async (req, res, next) => {
  try {
    const validateUser = await NEW_USER_VALIDATION_SCHEMA.validate(req.body);
    req.body = validateUser
    next()
  } catch (error) {
    next(createHttpError(422, error.errors[0]))
  }
};

module.exports.validateUserOnUpdate = async (req, res, next) => {
  try {
    const validateUser = await UPDATED_USER_VALIDATION_SCHEMA.validate(req.body);
    req.body = validateUser
    next()
  } catch (error) {
    next(createHttpError(422, error.errors[0]))
  }
};