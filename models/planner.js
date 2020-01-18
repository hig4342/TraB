'use strict';
module.exports = (sequelize, DataTypes) => {
  const Planner = sequelize.define('Planner', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    CountryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    CityId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    contents_image: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    contents_text: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    themes_id: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    thumbnail: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    blog_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    blog_link: {
      allowNull: true,
      type: DataTypes.STRING
    },
    upload_state: {
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.INTEGER
    },
    payment_state: {
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.INTEGER
    },
    hit: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
  }, {});
  Planner.associate = function(models) {
    Planner.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
    Planner.belongsTo(models.Country, {
      foreignKey: 'CountryId'
    })
    Planner.belongsTo(models.City, {
      foreignKey: 'CityId'
    })
    Planner.hasMany(models.Reply)
  };
  return Planner;
};