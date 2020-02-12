'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    salt: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE
    },
    sex: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    address_zonecode: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    address_fulladdress: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address_detailaddress: {
      allowNull: false,
      type: DataTypes.STRING
    },
    profile_image: {
      allowNull: true,
      type: DataTypes.STRING
    },
    profile: {
      allowNull: true,
      type: DataTypes.STRING
    },
    account_bank: {
      allowNull: true,
      type: DataTypes.STRING
    },
    account_num: {
      allowNull: true,
      type: DataTypes.STRING
    },
    state_id: {
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.INTEGER
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Board)
    User.hasMany(models.BoardReply)
    User.hasMany(models.Reply)
    User.hasMany(models.Planner)
    User.hasMany(models.Favorite)
    User.hasMany(models.Rate)
  };
  return User;
};