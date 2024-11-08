// frontend/src/components/Heatmap.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCustomerActivity } from '../api/apiService';

const Heatmap = () => {
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        fetchCustomerActivity().then(data => setActivityData(data.data));
    }, []);

    const areas = [...new Set(activityData.map(item => item.area))];
    const timestamps = [...new Set(activityData.map(item => item.timestamp))];
    const activityLevels = areas.map(area => 
        timestamps.map(timestamp => {
            const entry = activityData.find(
                item => item.area === area && item.timestamp === timestamp
            );
            return entry ? entry.activityLevel : 0;
        })
    );

    return (
        <Plot
            data={[
                {
                    x: timestamps,
                    y: areas,
                    z: activityLevels,
                    type: 'heatmap',
                    hoverinfo: 'text',
                    text: activityData.map(item => 
                        `Area: ${item.area}<br>Activity: ${item.activityLevel}<br>Time: ${new Date(item.timestamp).toLocaleTimeString()}`
                    ),
                    colorscale: 'Viridis'
                }
            ]}
            layout={{
                title: 'Customer Activity Heatmap',
                xaxis: { title: 'Time' },
                yaxis: { title: 'Hotel Areas' },
                autosize: true,
                margin: { l: 50, r: 50, b: 50, t: 50 },
            }}
        />
    );
};

export default Heatmap;
