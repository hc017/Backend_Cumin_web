const express = require('express');
// const session = require('express-session'); // Add this line
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


connectDB();

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
