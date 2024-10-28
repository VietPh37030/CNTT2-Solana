const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const http = require('http');

const routes1 = require('./routes/routes');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Session middleware
app.use(session({
  secret: process.env.SECRETKEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

// // Redirect root URL to the login page
// app.get('/', (req, res) => {
//   res.redirect('/api/v1/login'); // Change this path based on your actual login route
// });

// Routes
app.use('/', routes1);


// Catch 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Create HTTP server
const server = http.createServer(app);

// Start the server
server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

module.exports = app;
