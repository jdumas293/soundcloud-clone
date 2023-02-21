'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate(models) {
      // define association here
      Track.belongsTo(models.User, { foreignKey: 'userId' });
      Track.hasMany(models.Comment, { foreignKey: 'trackId' });
    }
  }
  Track.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};