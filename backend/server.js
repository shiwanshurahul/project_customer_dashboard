// server.js (backend)
const express = require('express');
const cors = require('cors');
const activityRoutes = require('./routes/activityRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Use the activity routes from activityRoutes.js
app.use('/api', activityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
