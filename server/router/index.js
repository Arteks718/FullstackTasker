const { Router } = require('express')
const tasksRouter = require('./tasksRouter.js')

const appRouter = Router()

appRouter.use('/tasks',tasksRouter)

module.exports = appRouter