// frontend/src/components/Insights.js
import React, { useEffect, useState } from 'react';
import { fetchCustomerActivity } from '../api/apiService';

const Insights = () => {
    const [insights, setInsights] = useState({});

    useEffect(() => {
        fetchCustomerActivity().then(data => setInsights(data.insights));
    }, []);

    return (
        <div>
            <h3>Insights</h3>
            <p><strong>Most Active Area:</strong> {insights.mostActiveArea}</p>
            <p><strong>Least Active Area:</strong> {insights.leastActiveArea}</p>
        </div>
    );
};

export default Insights;
