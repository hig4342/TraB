'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Replies', 'rate');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Replies', 'rate');
  }
};
