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
      allowNull: false,
      validate: {
        len: {
          args: [1, 25],
          msg: "Title must be less than 25 characters!"
        }
      }
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 20],
          msg: "Genre must be less than 20 characters!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "Description must be less than 100 characters!"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};