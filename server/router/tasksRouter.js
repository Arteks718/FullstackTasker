const { Router } = require('express')
const { tasksController } = require('../controllers')
const tasksRouter = Router()

tasksRouter
  .route('/')
  .get(tasksController.getAllTask)
  .post(tasksController.createTask)
  .delete(tasksController.deleteAllTasks)

tasksRouter
  .route('/:taskId')
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTaskById)
  .delete(tasksController.deleteTaskById)

module.exports = tasksRouter