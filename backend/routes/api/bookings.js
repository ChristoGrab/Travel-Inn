const express = require('express');
const router = express.Router()
const { Booking, Spot, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require("sequelize");



// GET ALL SPOT BOOKINGS THAT ARE NOT CURRENT BOOKING
router.get('/restricted/:spotId/:bookingId', requireAuth, async (req, res) => {
  const restrictedBookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
      id: {
        [Op.ne]: req.params.bookingId
      }
    }
  })
  
  let bookingsList = []
  
  // create an array of the bookings and convert them to JSON
  restrictedBookings.forEach(booking => {
    bookingsList.push(booking.toJSON())
  })
  
  return res.json({"Bookings": bookingsList})
})

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
      include: [
        { 
          model: SpotImage,
        },
        {
          model: User,
          as: "Owner",
          attributes: ["firstName"]
        }
      ]
    }
  })
  
  // create an array of the bookings and convert them to JSON
  let bookingsList = []
  
  myBookings.forEach(booking => {
    bookingsList.push(booking.toJSON())
  })

  bookingsList.forEach(booking => {
    booking.Spot["host"] = booking.Spot.Owner.firstName
    booking.Spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview) {
        booking.Spot.previewImage = spotImage.url
      }
    })
      
    delete booking.Spot.SpotImages;
    delete booking.Spot.Owner;
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
  
  if (booking.userId !== req.user.id) {
    res.status(403);
    return res.json({
      message: "Unauthorized request",
      statusCode: 403
    })
  }
  
  const { startDate, endDate } = req.body
  let endDateCheck = new Date(endDate)
  
  if (endDateCheck < new Date()) {
    res.status(400);
    return res.json({
      "message": "This booking has already ended and cannot be modified",
      "statusCode": 403
    })
  }
  
  if (startDate > endDate) {
    res.status(400);
    return res.json({
      "message": "Start date must be before end date",
      "statusCode": 400
    })
  }
  
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
      "message": "Unauthorized request",
      "statusCode": 403
    })
  }
  
  // Turn startDate into a Date object and compare it to present
  let requestObject = booking.toJSON();
  let startDate = requestObject.startDate
  startDate = new Date(startDate)
  
  if (startDate < new Date()) {
    res.status(403);
    return res.json({
      "message": "Bookings that have already started cannot be deleted",
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
