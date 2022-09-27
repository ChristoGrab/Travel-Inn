const express = require('express')
const { Spot, Review, SpotImage } = require('../../db/models');
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');




// GET all Spots

router.get('/', async (req, res, next) => {
  
  const allSpots = await Spot.findAll({
    include: [
      {
      model: Review,
      attributes: []
    },
    {
      model: SpotImage
    }
  ]
  });
  
  // Create an array of each spot
  let spotsList = [];
  allSpots.forEach(spot => {
    spotsList.push(spot.toJSON())
  })

  
  spotsList.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview === true) {
        spot.previewImage = image.url
      }
    })
    if (!spot.previewImage) {
      spot.previewImage = "This spot doesn't have a preview"
    }
  })
  
  res.json({spotsList});
})

module.exports = router;