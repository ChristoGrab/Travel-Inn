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
      include: [
        {
          model: SpotImage,
          attributes: ['preview', 'url']
        }
      ]
    }
  })
  
  //TRYING TO SOLVE PREVIEWIMAGE
  
  // let bookingsList = []
  // myBookings.forEach(booking => {
  //   bookingsList.push(booking.toJSON())
  // })
  
  // let spotsList = []
  // bookingsList.forEach(booking => {
  //   spotsList.push(booking.Spot)
  //   })
    
  // let imageList = []
  // spotsList.forEach(spot => {
  //   imageList.push(spot.SpotImages)
  // })
  
  // console.log(imageList)
  // let imgUrl;
  
  // imageList[0].forEach(image => {
  //   if (image.preview === true) {
  //     imgUrl = image.url
  //   }
  // })
  
  // console.log(imgUrl);
  
  res.json({"Bookings": myBookings})
})



module.exports = router;