'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    PlannerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    rate: {
      allowNull: false,
      type: DataTypes.FLOAT,
    }
  }, {});
  Reply.associate = function(models) {
    Reply.belongsTo(models.Planner, {
      foreignKey: 'PlannerId'
    })
    Reply.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
  };
  return Reply;
};