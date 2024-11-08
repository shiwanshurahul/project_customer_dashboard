
// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

function App() {
  const [activityData, setActivityData] = useState({});
  const [insights, setInsights] = useState({ mostActiveArea: '', leastActiveArea: '' });

  useEffect(() => {
    // Fetch data from the backend (GET request to fetch dynamic data)
    fetch('http://localhost:3001/api/customer-activity')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log to check the response
        setActivityData(data);  // Update state with the fetched data

        // Calculate insights (most and least active areas)
        const entries = Object.entries(data);
        const mostActiveArea = entries.reduce((max, area) => (area[1] > max[1] ? area : max))[0];
        const leastActiveArea = entries.reduce((min, area) => (area[1] < min[1] ? area : min))[0];
        setInsights({
          mostActiveArea,
          leastActiveArea,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Prepare data for Plotly heatmap
  const heatmapData = activityData ? Object.values(activityData) : [];

  return (
    <div className="dashboard-container">
      <h1>Customer Activity Dashboard</h1>
      <div className="heatmap-container">
        {/* Render Plotly heatmap if data is available */}
        {heatmapData.length > 0 && (
          <Plot
            data={[
              {
                // Plotting heatmap with a single row for activity data
                z: [heatmapData], // Wrap the data in an array to make it a 2D grid
                x: Object.keys(activityData), // Activity areas (e.g., lobby, gym, etc.)
                // y: ['Activity Levels'], // A single Y-axis label for clarity
                type: 'heatmap',
                colorscale: 'Viridis',
                showscale: true, // Show the color scale legend
              },
            ]}
            layout={{
              title: 'Customer Activity Heatmap',
              xaxis: { title: 'Areas' },
              yaxis: { title: 'Activity Levels' },
            }}
          />
        )}
      </div>
      <div className="insights-container">
        <h3>Insights</h3>
        {insights.mostActiveArea && (
          <p>Most Active Area: {insights.mostActiveArea}</p>
        )}
        {insights.leastActiveArea && (
          <p>Least Active Area: {insights.leastActiveArea}</p>
        )}
      </div>
    </div>
  );
}

export default App;
