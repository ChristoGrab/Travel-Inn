const express = require('express')
const { Spot, Review, SpotImage, User, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();
const { validateReview, validateSpot } = require('../../utils/errors');
const BookingError = require('../../utils/bookingErrors');

// ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID //
router.post('/:spotId/images', requireAuth, async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    const error = new Error("The listing you are looking for couldn't be found")
    error.status = 404
    error.title = "Listing not found"
    return next(error)
  }

  const { url, preview } = req.body;

  const newImage = await SpotImage.create({
    spotId: req.params.spotId,
    url,
    preview
  })

  return res.json({
    id: newImage.id,
    url,
    preview
  })
})

// GET ALL REVIEWS BY A SPOT'S ID //

router.get('/:spotId/reviews', async (req, res, next) => {
  
  const spot = await Spot.findByPk(req.params.spotId)
  
  // Handle case where spot doesn't exist
  if (!spot) {
    const error = new Error("The listing you are looking for couldn't be found")
    error.status = 404
    error.title = "Listing not found"
    return next(error)
    }
  
  const spotReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  })

  return res.json({ "Reviews": spotReviews })

})

// GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOT'S ID
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  
  const spot = await Spot.findByPk(req.params.spotId)

  // Handle case where spot doesn't exist
  if (!spot) {
    const error = new Error("The listing you are looking for couldn't be found")
    error.status = 404
    error.title = "Listing not found"
    return next(error)
  }

  // If the user is not the owner of the spot, only return the booked dates
  if (spot.ownerId !== req.user.id) {
    
    const nonOwnerBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      attributes: ['id', 'spotId', 'startDate', 'endDate']
    })
    return res.json({
      "Bookings": nonOwnerBookings
    })
  }

  // If the user is the owner of the spot, return all booking information
  else {
    
    const ownerBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    })
    return res.json({
      "Bookings": ownerBookings
    })
  }
})

// GET ALL SPOTS OWNED BY THE CURRENT USER //
router.get('/current', requireAuth, async (req, res) => {

  // Query the database for all spots owned by the current user, and include the average rating for each spot
  const currentUserSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    },
    attributes: {
      include: [
        [sequelize.fn('round', sequelize.fn('avg', sequelize.col('stars')), 1), 'avgRating']
      ]
    },
    group: ['Spot.id', "SpotImages.id"],

    include: [
      {
        model: User,
        as: "Owner",
        attributes: []
      },
      {
        model: SpotImage
      },
      {
        model: Review,
        attributes: []
      }
    ]
  })

  const spotsList = [];
  
  currentUserSpots.forEach(spot => {
    spotsList.push(spot.toJSON())
  })

  spotsList.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview === true) {
        spot.previewImage = image.url
      }
    })
  })

  // Delete the nested array of images
  spotsList.forEach(spot => {
    delete spot.SpotImages
  })
  
  spotsList.forEach(spot => {
    if (spot.avgRating === null) {
      spot.avgRating = "No Ratings"
    }
  })
  
  
  return res.json({
    "Spots": spotsList
  })
})

// GET SPOT BY ID //

router.get('/:spotId', async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {

      include: [
        [sequelize.fn('count', sequelize.col('review')), 'numReviews'],
        [sequelize.fn('round', sequelize.fn('avg', sequelize.col('stars')), 1), 'avgStarRating']
      ]
    },

    group: ["Spot.id", "SpotImages.id", "Owner.id"],

    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"]
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"]
      },
      {
        model: Review,
        attributes: []
      }
    ]
  })

  
  if (!spot) {
    const error = new Error("The listing you are looking for couldn't be found")
    error.status = 404
    error.title = "Listing not found"
    return next(error)
  }

  spotObject = spot.toJSON()

  // If the spot has no ratings, set the avgStarRating to a message saying so
  if (!spotObject.avgStarRating) {
    spotObject.avgStarRating = "This spot does not have any ratings yet"
  }

  return res.json(spotObject)
})

// GET ALL SPOTS //
router.get('/', async (req, res) => {

  // Pagination
  let { page, size } = req.query;
  if (!page) page = 1;
  if (!size) size = 20;

  page = parseInt(page);
  size = parseInt(size);

  if (page > 10) page = 10;
  if (size > 20) size = 20;
  
  if (Number.isInteger(page) && Number.isInteger(size) &&
    page > 0 && size > 0) {
    limit = size;
    offset = size * (page - 1);
  }

  // First query for spots by pagination
  const allSpots = await Spot.findAll({
    limit,
    offset,
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review,
        attributes: ['stars']
      }
    ]
  });
  
    // Create an array of each spot by converting each to JSON
    let spotsList = [];
    allSpots.forEach(spot => {
      spotsList.push(spot.toJSON())
    })
  
    // Create separate avgRating and numReviews properties because sequelize is a pain
    // Add the sum of all review scores to each associated spot by id and keep track of numReviews
    // If there are no reviews, set avgRating to "No ratings"
    spotsList.forEach(spot => {
      
      let reviewSum = 0;
      let reviewNum = 0;
      
      spot.Reviews.forEach(review => {
        reviewSum += review.stars
        reviewNum += 1
      })
      
      spot.avgRating = reviewSum / reviewNum || "No ratings";
      spot.numReviews = spot.Reviews.length || 0;
      
      // Round the avgRating to 2 decimal places
      if (typeof spot.avgRating === "number") {
        spot.avgRating = spot.avgRating.toFixed(2)
      }
    })

  // Iterate through each spot, finding the associated SpotImage with preview set to true
  spotsList.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview === true) {
        spot.previewImage = image.url
      }
    })

    // Message if no images are marked as preview
    if (!spot.previewImage) {
      spot.previewImage = "This spot doesn't have a preview image"
    }
  })
  
  // Delete the nested images and numReviews property
  spotsList.forEach(spot => {
    delete spot.SpotImages
    delete spot.Reviews
  })

  return res.json({ "Spots": spotsList, page, size });
})

// CREATE REVIEW FOR A SPOT BASED ON THE SPOT'S ID //
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Review,
      }
    ]
  })

  if (!spot) {
    const error = new Error("The listing you are looking for couldn't be found")
    error.status = 404
    error.title = "Listing not found"
    return next(error)
  }

  // Turn the Spot into a JSON
  let hasReview = false;
  const spotToJSON = spot.toJSON();

  spotToJSON.Reviews.forEach(review => {
    if (review.userId === req.user.id) {
      hasReview = true;
    }
  })

  // if (hasReview === true) {
  //   res.status(403);
  //   return res.json({
  //     "message": "You have already left a review for this spot",
  //     "statusCode": 403
  //   })
  // }

  const { review, stars } = req.body;

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: spot.id,
    review,
    stars
  })

  res.status(201);
  return res.json(newReview);
})


// CREATE A BOOKING FROM A SPOT BASED ON THE SPOT'S ID
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  // 404 error
  if (!spot) {
    const error = new Error("The listing you are looking for couldn't be found")
    error.status = 404
    error.title = "Listing not found"
    return next(error)
  }

  // Prevent owner from making a booking
  if (req.user.id === spot.ownerId) {
    const error = new Error("You cannot create a booking for a property you own")
    error.status = 403
    error.title = "Forbidden action"
  }

  const { startDate, endDate } = req.body
  startDateCheck = new Date(startDate)
  endDateCheck = new Date(endDate)

  // Sanity check for request start date coming before end date
  if (endDateCheck <= startDateCheck) {
    res.status(400);
    return res.json({
      "message": "The end date for your booking cannot be on or before the start date",
      "statusCode": 400
    })
  }

  // Query for all existing bookings at designated spot
  const bookingConflict = await Booking.findAll({
    where: {
      spotId: req.params.spotId
    }
  })

  const bookingsList = []
  bookingConflict.forEach(booking => {
    bookingsList.push(booking.toJSON())
  })

  // Check request start and end dates against all pre-existing bookings.
  // New booking cannot overlap with or encapsulate an existing booking
  for (let i = 0; i < bookingsList.length; i++) {

    let conflictStart = new Date(bookingsList[i].startDate)
    let conflictEnd = new Date(bookingsList[i].endDate)

    if (startDateCheck >= conflictStart && startDateCheck <= conflictEnd) {
      const err = new BookingError("Your check-in date conflicts with an existing booking.")
      return next(err)
    } else if (endDateCheck >= conflictStart && endDateCheck <= conflictEnd) {
      const err = new BookingError("Your check-out date conflicts with an existing booking.")
      return next(err)
    } else if (startDateCheck < conflictStart && endDateCheck > conflictStart) {
      const err = new BookingError("The dates you requested are in conflict with a pre-existing booking.")
      return next(err)
    }
  }

  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate,
    endDate
  })


  return res.json({
    id: newBooking.id,
    spotId: newBooking.spotId,
    userId: newBooking.userId,
    startDate: newBooking.startDate,
    endDate: newBooking.endDate,
    createdAt: newBooking.createdAt,
    updatedAt: newBooking.updatedAt
  })
})

// CREATE A SPOT //
router.post('/', requireAuth, validateSpot, async (req, res) => {

  // Deconstruct request body for fields
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body

  // Set ownerId to current User id with nifty req.user
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  res.status(201);
  return res.json(newSpot)

})

// EDIT A SPOT //

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    const error = new Error("The listing you are looking for couldn't be found")
    error.status = 404
    error.title = "Listing not found"
    return next(error)
  }

  if (spot.ownerId !== req.user.id) {
    const error = new Error("You cannot edit a listing that you do not own")
    error.status = 403
    error.title = "Forbidden action"
    return next(error)
  }

  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body

  const updatedSpot = await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  res.json(updatedSpot)
})

// DELETE A SPOT //

router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
   const error = new Error("The listing you are looking for couldn't be found")
    error.status = 404
    error.title = "Listing not found"
    return next(error)
  }

  if (spot.ownerId !== req.user.id) {
    const error = new Error("You cannot delete a listing that you do not own")
    error.status = 403
    error.title = "Forbidden action"
    return next(error)
  }

  await spot.destroy()

  return res.json({
    "message": "Successfuly deleted",
    "statusCode": 200
  })
})

module.exports = router;
