// frontend/src/api/apiService.js
export const fetchCustomerActivity = async () => {
    const response = await fetch('http://localhost:3001/api/customer-activity');
    const data = await response.json();
    return data;
};
