'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    PlannerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    favorite: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.Planner, {
      foreignKey: 'PlannerId'
    })
    Favorite.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
  };
  return Favorite;
};