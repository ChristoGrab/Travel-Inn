const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImageRouter = require('./spot-images.js');
const { restoreUser, requireAuth } = require('../../utils/auth.js');


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);


// List of routers
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotImageRouter);


//Test for logged in user
router.get('/test', requireAuth, (req, res) => {
  res.send("Success!")
});

//Test endpoint for post method
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;