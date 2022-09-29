const express = require('express');
const router = express.Router()
const { Booking, Spot, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')


// GET ALL OF THE CURRENT USER'S BOOKINGS

router.get('/current', requireAuth, async (req, res) => {
  const myBookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ['description', 'createdAt', 'updatedAt']
      },
      include:
        { model: SpotImage }
    }
  })
  
  let bookingsList = []
  myBookings.forEach(booking => {
    bookingsList.push(booking.toJSON())
  })
  
  bookingsList.forEach(booking => {
    booking.Spot.SpotImages.forEach(spotImage => {
      
      if (spotImage.preview) {
        booking.Spot.previewImage = spotImage.url
      
      } else {
        booking.Spot.previewImage = "This spot doesn't have a preview image"
      }
      
    })
    
    delete booking.Spot.SpotImages;
  })
  
  res.json({"Bookings": bookingsList})
})

// EDIT A BOOKING
router.put('/:bookingId', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId)
  
  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }
  
  const { startDate, endDate } = req.body
  
  await booking.update({
    startDate,
    endDate
  })
  
  return res.json({
    id: booking.id,
    spotId: booking.spotId,
    userId: booking.userId,
    startDate,
    endDate,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt
  })
})

// DELETE A BOOKING

router.delete('/:bookingId', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId, {
    include: {
      model: Spot
    }
  });
  
  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }
  
  if (booking.userId !== req.user.id) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }
  
  await booking.destroy();
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

module.exports = router;