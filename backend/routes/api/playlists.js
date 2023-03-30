const express = require('express');

const { Playlist, PlaylistTrack, Track } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// GET ALL PLAYLISTS OF CURRENT USER
router.get('/', async (req, res) => {
    const playlists = await Playlist.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: PlaylistTrack,
                include: [
                    {
                        model: Track
                    }
                ]
            },
        ]
    });

    let Playlists = [];
    playlists.forEach(playlist => {
        Playlists.push(playlist.toJSON());
    });

    res.json({ Playlists });
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

// DELETE TRACK FROM PLAYLIST
router.delete('/:playlistId/tracks/:trackId', requireAuth, async (req, res) => {
    const playlistTrack = await PlaylistTrack.findOne({
        where: {
            playlistId: req.params.playlistId,
            trackId: req.params.trackId
        }
    });

    if (!playlistTrack) {
        res.status(404);
        return res.json({
            message: "Successfully deleted",
            statusCode: 404
        })
    };

    await playlistTrack.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 404
    });
});

// GET ALL TRACKS FROM A PLAYLIST (GET SINGLE PLAYLIST)
router.get('/:playlistId', async (req, res) => {
    const tracks = await PlaylistTrack.findAll({
        where: {
            playlistId: req.params.playlistId
        },
        include: [
            {
                model: Track
            }
        ]
    });

    // console.log("TRACKS", tracks);

    if (!tracks) {
        res.status(404);
        res.json({
            message: "No tracks found",
            statusCode: 404
        });
    };

    res.json(tracks);
});

module.exports = router;