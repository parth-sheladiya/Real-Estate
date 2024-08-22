const express = require('express')
const mongoose =  require('mongoose')
const dotenv = require('dotenv')


const userRoutes = require('./routes/user.js')
const authRoutes = require('./routes/auth.js')
const listingRoutes = require('./routes/listing.js')

const cookieParser = require('cookie-parser')


mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRoutes)






app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});