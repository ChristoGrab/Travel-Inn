const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const BookingError = require('./utils/bookingErrors');

//Create a variable called isProduction that will be true if the environment
//is in production or not by checking the environment key in the configuration file
const { environment } = require('./config');
const isProduction = environment === 'production';

//Initialize the Express application
const app = express();
//Connect the morgan middleware for
//logging information about requests and responses
app.use(morgan('dev'));
//Add the cookie-parser middleware for parsing cookies
app.use(cookieParser());
//express.json middleware for parsing JSON bodies of
//requests with Content-Type of "application/json"
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { ValidationError } = require('sequelize');

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
//What Helmet does under the hood:
//https://www.npmjs.com/package/helmet
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

//Importing routes to app
const routes = require('./routes');
app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    } 
    
    if (err instanceof BookingError) {
        err.title = 'Booking error';
        err.message = err.message;
        err.errors = err.message;
    }
    next(err);
});


// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    return res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});

module.exports = app;
