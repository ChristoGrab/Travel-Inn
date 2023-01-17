class BookingError extends Error {
  constructor(message) {
    super()
    this.title = 'Booking Error'
    this.message = message
    this.status = 403;
  }
}

module.exports = BookingError
