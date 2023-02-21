const express = require('express');

const { Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// EDIT A COMMENT
router.put('/:commentId', requireAuth, async (req, res) => {
    const { commentBody } = req.body;
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
        res.status(404);
        res.json({
            message: "Comment not found",
            statusCode: 404
        });
    };

    // Comment must belong to the current user
    if (comment.userId === req.user.id) {
        comment.update({
            commentBody: commentBody
        });
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };
});

// DELETE A COMMENT
router.delete('/:commentId', requireAuth, async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
        res.status(404);
        res.json({
            message: "Comment not found",
            statusCode: 404
        });
    };

    // Comment must belong to the current user
    if (comment.userId === req.user.id) {
        await comment.destroy();
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