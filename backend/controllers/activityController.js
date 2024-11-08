
let activityData = {}; // Store activity data

// Function to handle the POST request for customer activity data
const handleCustomerActivityPost = (req, res) => {
  activityData = req.body; // Store the activity data

  // Identify most and least active areas
  const entries = Object.entries(activityData);
  const mostActiveArea = entries.reduce((max, area) => (area[1] > max[1] ? area : max))[0];
  const leastActiveArea = entries.reduce((min, area) => (area[1] < min[1] ? area : min))[0];

  // Respond with the original data and insights
  res.json({
    ...activityData,
    mostActiveArea,
    leastActiveArea,
  });
};

// Function to handle the GET request to retrieve customer activity data
const getCustomerActivity = (req, res) => {
  res.json(activityData); // Send the current activity data
};

module.exports = {
  handleCustomerActivityPost,
  getCustomerActivity
};

