const _ = require("lodash");
const createHttpError = require("http-errors");
const { Task } = require("../db/models");

module.exports = {
  getAllTask: async (req, res, next) => {
    try {
      const foundTasks = await Task.findAll({
        raw: true,
        attributes: { exclude: ["updatedAt"] },
      });

      res.status(200).send(foundTasks);
    } catch (error) {
      next(error);
    }
  },
  getTaskById: async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const foundTask = await Task.findByPk(taskId, {
        raw: true,
        attributes: { exclude: ["updatedAt"] },
      });
      if (!foundTask) {
        return next(createHttpError(404, `Task not found`));
      }
      res.status(200).send(foundTask);
    } catch (error) {
      next(error);
    }
  },
  createTask: async (req, res, next) => {
    const { body } = req;
    try {
      const createdTask = await Task.create(body);
      if (!createdTask) {
        console.log(createdTask);
        return next(createHttpError(500, `Server error`));
      }
      const preparedTask = _.omit(createdTask.get(), ["updatedAt"]);
      res.status(201).send(preparedTask);
    } catch (error) {
      next(error);
    }
  },
  updateTaskById: async (req, res, next) => {
    const {
      body,
      params: { taskId },
    } = req;
    try {
      const [, [updatedTask]] = await Task.update(body, {
        where: {
          id: taskId,
        },
        raw: true,
        attributes: { exclude: ["updatedAt"] },
        returning: true,
      });

      if (!updatedTask) {
        return next(createHttpError(404, "Task not found"));
      }
      res.status(200).send(updatedTask);
    } catch (error) {
      next(error);
    }
  },
  deleteTaskById: async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const deletedTaskCount = await Task.destroy({
        where: {
          id: taskId,
        },
      });
      if (!deletedTaskCount) {
        return next(createHttpError(404, "Task not deleted"));
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
  deleteAllTasks: async (req, res, next) => {
    try {
      const deletedTasks = await Task.destroy({ truncate: true, force: true });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};
