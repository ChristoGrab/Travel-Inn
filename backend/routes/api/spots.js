const express = require('express')
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();
const { Op } = require('sequelize');
const { validateReview } = require('../../utils/errors');


// CREATE IMAGE FOR SPOT //
router.post('/:spotId/images', requireAuth, async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
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
router.get('/:spotId/reviews', async (req, res) => {
  const spotReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  // An empty array is still a truthy value, so we need to check for length if there are no spots
  if (!spotReviews.length) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  return res.json({ "Reviews": spotReviews })

})

// GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOT'S ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const idCheck = await Spot.findByPk(req.params.spotId)


  // If query array is empty spot doesn't exist
  if (!idCheck) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (idCheck.ownerId !== req.user.id) {
    const nonOwnerBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
    return res.json({
      "Bookings": nonOwnerBookings
    })
  }

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

// GET SPOTS OWNED BY CURRENT USER //
router.get('/current', requireAuth, async (req, res) => {

  const mySpots = await Spot.findAll({
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

  const spotsList = []
  mySpots.forEach(spot => {
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

  return res.json({
    "Spots": spotsList
  })
})

// GET SPOT BY ID //

router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {

      include: [
        [sequelize.fn('count', sequelize.col('review')), 'numReviews'],
        [sequelize.fn('round', sequelize.fn('avg', sequelize.col('stars')), 1), 'avgRating']
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
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  return res.json(spot)
})

// GET ALL SPOTS //

router.get('/', async (req, res) => {
  
  let { page, size } = req.query;
  if (!page) page = 1;
  if (!size) size = 20;
  
  page = parseInt(page);
  size = parseInt(size);
  
  const pagination = {};

  // Include average rating for each Spot from its associated Reviews
  const allSpots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn('round', sequelize.fn('avg', sequelize.col('stars')), 1), 'avgRating']
      ]
    },
    // Have to include SpotImages for PostrGres
    group: ["Spot.id", "SpotImages.id"],
    include: [
      { model: SpotImage },
      {
        model: Review,
        attributes: []
      }
    ]
  });

  // Create an array of each spot by converting each to JSON
  let spotsList = [];
  allSpots.forEach(spot => {
    spotsList.push(spot.toJSON())
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

  // Delete the nested array of images
  spotsList.forEach(spot => {
    delete spot.SpotImages
  })

  return res.json({ "Spots": spotsList, page, size });
})

// CREATE REVIEW FOR A SPOT BASED ON THE SPOT'S ID //
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Review,
      }
    ]
  })

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // Turn the Spot into a JSON
  let hasReview = false;
  const spotToJSON = spot.toJSON();

  spotToJSON.Reviews.forEach(review => {
    if (review.userId === req.user.id) {
      hasReview = true;
    }
  })

  if (hasReview === true) {
    res.status(403);
    return res.json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }

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
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)
  
  // 404 error
  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  
  // Prevent owner from making a booking
  if (req.user.id === spot.ownerId) {
    res.status(403);
    return res.json({
      "message": "You cannot create a booking for a property you own",
      "statusCode": 403
    })
  }
  
  const { startDate, endDate } = req.body
  
  const bookingConflict = await Booking.findAll({
    where: {
      spotId: req.params.spotId
    }
  })
  
  const bookingsList = []
  bookingConflict.forEach(booking => {
    bookingsList.push(booking.toJSON())
  })
  
  for (let i = 0; i < bookingsList.length; i++) {
    let ele = bookingsList[i]
    if (ele.startDate === startDate ||
      ele.startDate === endDate ||
      ele.endDate === startDate ||
      ele.endDate === endDate) {
        res.status(403)
        return res.json({
          "message": "Sorry, this spot is not available for the requested dates",
          "statusCode": 403
        })
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

// CREATE A NEW SPOT //
router.post('/', requireAuth, async (req, res) => {

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

router.put('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403);
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
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

router.delete('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (spot.ownerId !== req.user.id) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  await spot.destroy()

  return res.json({
    "message": "Successfuly deleted",
    "statusCode": 200
  })
})

module.exports = router;