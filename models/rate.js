'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    PlannerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    rate: {
      allowNull: false,
      type: DataTypes.FLOAT,
    }
  }, {});
  Rate.associate = function(models) {
    Rate.belongsTo(models.Planner, {
      foreignKey: 'PlannerId'
    })
    Rate.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
  };
  return Rate;
};