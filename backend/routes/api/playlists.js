const express = require('express');

const { Playlist, PlaylistTrack } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// GET ALL PLAYLISTS OF CURRENT USER
router.get('/', async (req, res) => {
    const playlists = await Playlist.findAll({
        where: {
            userId: req.user.id
        }
    });

    let Playlists = [];
    playlists.forEach(playlist => {
        Playlists.push(playlist.toJSON());
    });

    res.json({ Playlists });
});

// GET SINGLE PLAYLIST
router.get('/:playlistId', async (req, res) => {
    const playlist = await Playlist.findOne({
        where: {
            id: req.params.playlistId
        },
        include: [
            {
                model: PlaylistTrack
            }
        ]
    });

    if (!playlist) {
        res.status(404);
        res.json({
            message: "Playlist not found",
            statusCode: 404
        });
    };

    res.json(playlist);
});

// CREATE PLAYLIST
router.post('/', requireAuth, async (req, res) => {
    const { name, description } = req.body;

    const playlist = await Playlist.create({
        userId: req.user.id,
        name,
        description
    });

    res.json(playlist);
});

// ADD TRACK TO PLAYLIST
router.post('/:playlistId/:trackId', requireAuth, async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.playlistId);

    if (!playlist) {
        res.status(404);
        res.json({
            message: "Playlist not found",
            statusCode: 404
        });
    };

    if (playlist.userId === req.user.id) {
        const playlistTrack = PlaylistTrack.create({
            playlistId: req.params.playlistId,
            trackId: req.params.trackId
        });
        res.json(playlistTrack);
    };
});

// DELETE PLAYLIST
router.delete('/:playlistId', requireAuth, async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.playlistId);

    if (!playlist) {
        res.status(404);
        return res.json({
            message: "Playlist not found",
            statusCode: 404
        });
    };

    if (playlist.userId === req.user.id) {
        await playlist.destroy();
        res.json({
            message: "Successfully deleted",
            statusCode: 404
        });
    } else {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };
});


module.exports = router;