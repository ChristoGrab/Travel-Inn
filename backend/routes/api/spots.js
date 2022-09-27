const express = require('express')
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();
const { Op } = require('sequelize');


// GET spot by Id

router.get('/spots/:spotId', async (req, res) => {
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    }
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
  
    
    if (!spot.previewImage) {
      spot.previewImage = "This spot doesn't have a preview image"
    }
  })
  
  spotsList.forEach(spot => {
    delete spot.SpotImages
    })
  
  res.json({"Spots": spotsList});
})

module.exports = router;