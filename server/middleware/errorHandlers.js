const createHttpError = require('http-errors');
const { ValidationError, BaseError } = require('sequelize')

module.exports.dbErrorHandler = (err, req, res, next) => {
  if(err instanceof ValidationError) {
    return res.status(422).send(err.errors);
  }
  if(err instanceof BaseError) {
    return next(createHttpError(500, 'Database Error'))
  }
  next(err)
}


module.exports.errorHandler = (err, rse, res, next) => {
  if(res.headerSet) {
    return
  }
  console.log('err=====>', err)
  const status = err.status?? 500
  const message = err.message?? "Server error"
  res.status(status).send(message)
}