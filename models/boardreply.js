'use strict';
module.exports = (sequelize, DataTypes) => {
  const BoardReply = sequelize.define('BoardReply', {
    BoardId: {
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
  }, {});
  BoardReply.associate = function(models) {
    BoardReply.belongsTo(models.Board, {
      foreignKey: 'BoardId'
    })
    BoardReply.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
  };
  return BoardReply;
};