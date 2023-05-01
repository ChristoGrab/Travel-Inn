class BookingError extends Error {
  constructor(message, status) {
    super()
    this.title = 'Booking Error'
    this.message = message
    this.status = status
  }
}

module.exports = BookingError
