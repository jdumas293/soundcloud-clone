'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, { foreignKey: 'userId' });
      Playlist.hasMany(models.PlaylistTrack, { foreignKey: 'playlistId' });
    }
  }
  Playlist.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};