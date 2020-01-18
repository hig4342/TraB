'use strict';
module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('Theme', {
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    }
  }, {});
  Theme.associate = function(models) {
    
  };
  return Theme;
};