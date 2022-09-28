const express = require('express');
const router = express('router');
const { Spot, User, ReviewImage, Review, SpotImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// GET ALL REVIEWS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
  const myReviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country',
            'lat', 'lng', 'name', 'price']
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ]
  })
  
  return res.json({"Reviews": myReviews})
})

module.exports = router;