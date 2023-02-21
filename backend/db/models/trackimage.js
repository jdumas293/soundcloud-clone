'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrackImage extends Model {
    static associate(models) {
      // define association here
      TrackImage.belongsTo(models.Track, { foreignKey: 'trackId' });
    }
  }
  TrackImage.init({
    trackId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TrackImage',
  });
  return TrackImage;
};