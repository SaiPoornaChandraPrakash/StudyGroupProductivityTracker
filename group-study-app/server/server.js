const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const groupRoutes = require('./routes/group');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/group',groupRoutes);
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

app.use(errorHandler);

app.listen(process.env.PORT || 5555, () => console.log(`Server running...`));