const express = require('express');

const { Track, TrackImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// GET ALL TRACKS
router.get('/', async (req, res) => {
    const tracks = await Track.findAll();

    let Tracks = [];
    tracks.forEach(track => {
        Tracks.push(track.toJSON());
    });

    console.log('TRACKS ===>', tracks);

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

    console.log('TRACKS ===>', Tracks);

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
router.post('/', requireAuth, async (req, res) => {
    const { title, file, genre, description, imageUrl } = req.body;
    const track = await Track.create({
        userId: req.user.id,
        title: title,
        file: file,
        genre: genre,
        description: description,
        imageUrl: imageUrl
    });

    res.json(track);
});

// ADD AN IMAGE TO A TRACK
router.post('/:trackId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const track = await Track.findOne({
        where: {
            id: req.params.trackId
        },
        include: [
            {
                model: TrackImage
            }
        ]
    });

    if (!track) {
        res.status(404);
        res.json({
            message: "Track not found",
            statusCode: 404
        })
    }

    // Track must belong to the current user
    if (track.userId === req.user.id) {
        await TrackImage.create({
            trackId: req.params.trackId,
            url: url
        });
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    // Query for new track image
    const newTrackImage = await TrackImage.findOne({
        where: {
            trackId: req.params.trackId
        }
    });

    res.json(newTrackImage);
})

// EDIT A TRACK
router.put('/:trackId', requireAuth, async (req, res) => {
    const { title, file, genre, description, imageUrl } = req.body;

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
        track.update({
            title: title,
            file: file,
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


// COMMENT ROUTES HERE
// GET ALL COMMENTS BY TRACK ID
// CREATE COMMENT FOR TRACK BY TRACK ID




module.exports = router;