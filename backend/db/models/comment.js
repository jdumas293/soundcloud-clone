'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Track, { foreignKey: 'trackId' });
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trackId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 140],
          msg: "Comments must be less than 140 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};