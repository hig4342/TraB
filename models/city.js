'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    city_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    CountryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  City.associate = function(models) {
    City.belongsTo(models.Country, {
      foreignKey: 'CountryId'
    })
    City.hasMany(models.Planner)
  };
  return City;
};