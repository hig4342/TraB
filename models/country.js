'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    country_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});
  Country.associate = function(models) {
    Country.hasMany(models.City)
    Country.hasMany(models.Planner)
  };
  return Country;
};