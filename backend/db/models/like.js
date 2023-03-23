'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // define association here
      Like.belongsTo(models.User, { foreignKey: 'userId' });
      Like.belongsTo(models.Track, { foreignKey: 'trackId' });
    }
  }
  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trackId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};