'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Boards', 'ad_deadline', {
      allowNull: true,
      type: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Boards', 'ad_deadline');
  }
};
