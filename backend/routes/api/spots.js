const express = require('express')
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models')
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize')

// GET all spots

router.get('/', async (req, res, next) => {
  const allSpots = await Spot.findAll({
    attributes: {
      include: [
        [
          sequelize.fn("AVG", sequelize.col("Reviews.stars")),
          "avgStars"
        ]
      ]
    },
    include: {
      model: Review,
      attributes: []
    }
  });
  
  res.json({"Spots": allSpots});
})

module.exports = router;