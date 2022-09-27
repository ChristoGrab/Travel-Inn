const express = require('express')
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();
const { Op } = require('sequelize');


// GET spot by Id

router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        [sequelize.fn('count', sequelize.col('review')), 'numReviews'],
        [sequelize.fn('avg', sequelize.col('stars')), 'avgRating']
      ]
    },
    group: ["Spot.id"],
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
      },
    ]
  })

  if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  res.json(spot)
})

// GET all Spots

router.get('/', async (req, res) => {

  // Include average rating for each Spot from its associated Reviews
  const allSpots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn('avg', sequelize.col('stars')), 'avgRating']
      ]
    },
    group: ["Spot.id"],
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

  res.json({ "Spots": spotsList });
})


//CREATE a new Spot
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

  res.json(newSpot)

})

module.exports = router;