const express = require('express');
const { Like, Track } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// GET LIKES OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const likes = await Like.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Track
            }
        ]
    });

    let Likes = [];
    likes.forEach(like => {
        Likes.push(like.toJSON());
    });

    res.json({ Likes });
});

// GET SINGLE LIKE
router.get('/:likeId', async (req, res) => {
    const like = await Like.findByPk(req.params.likeId);

    if (!like) {
        res.status(404);
        res.json({
            message: "Like not found",
            statusCode: 404
        });
    };

    res.json(like);
});

// DELETE A LIKE
router.delete('/:likeId', requireAuth, async (req, res) => {
    const like = await Like.findByPk(req.params.likeId);

    if (!like) {
        res.status(404);
        res.json({
            message: "Like not found",
            statusCode: 404
        });
    };

    if (like.userId === req.user.id) {
        await like.destroy();
        res.json({
            message: "Successfully deleted",
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

module.exports = router;