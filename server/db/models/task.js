'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deadline: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString(),
      }
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Task',
  });
  return Task;
};