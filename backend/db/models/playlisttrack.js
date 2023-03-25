'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistTrack extends Model {
    static associate(models) {
      // define association here
      PlaylistTrack.belongsTo(models.Playlist, { foreignKey: 'playlistId' });
      PlaylistTrack.belongsTo(models.Track, { foreignKey: 'trackId' });
    }
  }
  PlaylistTrack.init({
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trackId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PlaylistTrack',
  });
  return PlaylistTrack;
};