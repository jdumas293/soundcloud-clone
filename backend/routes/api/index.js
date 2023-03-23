const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const tracksRouter = require('./tracks.js');
const commentsRouter = require('./comments.js');
const likesRouter = require('./likes.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/tracks', tracksRouter);
router.use('/comments', commentsRouter);
router.use('/likes', likesRouter);


router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

module.exports = router;