'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    board_state: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    banner_image: {
      allowNull: true,
      type: DataTypes.STRING
    },
    ad_link: {
      allowNull: true,
      type: DataTypes.STRING
    },
    hit: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
  }, {});
  Board.associate = function(models) {
    Board.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
    Board.hasMany(models.BoardReply)
  };
  return Board;
};