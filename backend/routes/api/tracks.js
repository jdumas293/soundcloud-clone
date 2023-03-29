const express = require('express');

const { Track, Comment, Like, Playlist, PlaylistTrack } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

// GET ALL TRACKS
router.get('/', async (req, res) => {
    const tracks = await Track.findAll();

    let Tracks = [];
    tracks.forEach(track => {
        Tracks.push(track.toJSON());
    });

    // console.log('TRACKS ===>', tracks);

    res.json({ Tracks });
});

// GET TRACKS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const tracks = await Track.findAll({
        where: {
            userId: req.user.id
        }
    })

    let Tracks = [];
    tracks.forEach(track => {
        Tracks.push(track.toJSON());
    });

    // console.log('TRACKS ===>', Tracks);

    res.json({ Tracks });
})

// GET SINGLE TRACK
router.get('/:trackId', async (req, res) => {
    const track = await Track.findOne({
        where: {
            id: req.params.trackId
        }
    })

    if (!track) {
        res.status(404);
        res.json({
            message: "Track not found",
            statusCode: 404
        })
    }

    // console.log('TRACK ===>', track);

    res.json(track);
});

// CREATE A TRACK
router.post('/', singleMulterUpload("file"), requireAuth, async (req, res) => {
    const { title, genre, description, imageUrl } = req.body;

    const audioFile = await singlePublicFileUpload(req.file);

    const track = await Track.create({
        userId: req.user.id,
        title: title,
        file: audioFile,
        genre: genre,
        description: description,
        imageUrl: imageUrl
    });

    return res.json(track);
});

// EDIT A TRACK
router.put('/:trackId', singleMulterUpload("file"), requireAuth, async (req, res) => {
    const { title, genre, description, imageUrl } = req.body;

    const track = await Track.findOne({
        where: {
            id: req.params.trackId
        }
    });

    if (!track) {
        res.status(404);
        res.json({
            message: "Track not found",
            statusCode: 404
        });
    };

    // Track must belong to the current user
    if (track.userId === req.user.id) {

        const audioFile = await singlePublicFileUpload(req.file);
        
        track.update({
            title: title,
            file: audioFile,
            genre: genre,
            description: description,
            imageUrl: imageUrl
        });
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    res.json(track);
});

// DELETE A TRACK
router.delete('/:trackId', requireAuth, async (req, res) => {
    const track = await Track.findOne({
        where: {
            id: req.params.trackId
        }
    });

    if (!track) {
        res.status(404);
        res.json({
            message: "Track not found",
            statusCode: 404
        });
    };

    // Track must belong to the current user
    if (track.userId === req.user.id) {
        await track.destroy();
        res.json({
            message: "Successfully Deleted",
            statusCode: 200
        });
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };
});


// COMMENT ROUTES

// GET ALL COMMENTS BY TRACK ID
router.get('/:trackId/comments', async (req, res) => {
    const track = await Track.findByPk(req.params.trackId);

    if (!track) {
        res.status(404);
        return res.json({
            message: "Track not found",
            statusCode: 404
        });
    };

    const comments = await Comment.findAll({
        where: {
            trackId: req.params.trackId
        },
        // include: [ 
        //     {
        //         model: User
        //     }
        // ]
    });

    let Comments = [];
    comments.forEach(comment => {
        Comments.push(comment.toJSON());
    });

    return res.json({ Comments });
});

// CREATE COMMENT FOR TRACK BY TRACK ID
router.post('/:trackId/comments', requireAuth, async (req, res) => {
    const { commentBody } = req.body;
    const track = await Track.findOne({
        where: {
            id: req.params.trackId
        }
    });

    if (!track) {
        res.status(404);
        res.json({
            message: "Track not found",
            statusCode: 404
        });
    };

    const comment = await Comment.create({
        userId: req.user.id,
        trackId: req.params.trackId,
        commentBody: commentBody
    });

    res.json(comment);
});


// LIKE ROUTES

// CREATE A LIKE
router.post('/:trackId/likes', requireAuth, async (req, res) => {
    const track = await Track.findByPk(req.params.trackId);

    if (!track) {
        res.status(404);
        res.json({
            message: "Track not found",
            statusCode: 404
        });
    };

    const existingLike = await Like.findOne({
        where: {
            userId: req.user.id,
            trackId: req.params.trackId
        }
    });

    if (existingLike) {
        res.status(403);
        res.json({
            message: "User has already liked this track",
            statusCode: 403
        });
    } else {
        const like = await Like.create({
            userId: req.user.id,
            trackId: req.params.trackId
        });
        res.json(like);
    };
});


// PLAYLIST ROUTES

// ADD TRACK TO PLAYLIST
router.post('/:trackId/playlists/:playlistId', requireAuth, async (req, res) => {
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

module.exports = router;