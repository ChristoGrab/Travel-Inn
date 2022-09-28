const express = require('express');
const router = express.Router()
const { Booking, Spot, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')


// GET ALL OF THE CURRENT USER'S BOOKINGS

router.get('/current', requireAuth, async (req, res) => {
  const myBookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: {
      model: Spot,
      exclude: ['createdAt', 'updatedAt']
    },
  })
  
  res.json({"Bookings": myBookings})
})

module.exports = router;