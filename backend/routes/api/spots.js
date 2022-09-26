const express = require('express')
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models')
const router = express.Router();
const { Op } = require('sequelize');

// GET all spots

router.get('/', async (req, res, next) => {
  const allSpots = await Spot.findAll({
    // include: {
    //   model: Review,
    //   attributes: ['stars']
    // }
  });
  
  res.json({"Spots": allSpots});
})

module.exports = router;