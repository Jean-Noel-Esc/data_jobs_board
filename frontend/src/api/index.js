const API_URL = import.meta.env.VITE_API_URL || 'https://jobboard-api-ur9k.onrender.com';

// Rest of your code stays the same
export const fetchJobs = async () => {
    try {
        const response = await fetch(`${API_URL}/api/jobs`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

export const analyzeSalary = async (experiences) => {
    try {
        const response = await fetch(`${API_URL}/api/analyze-salary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ experiences }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error analyzing salary:', error);
        throw error;
    }
};

export const exploreJobs = async (description) => {
    try {
        const response = await fetch(`${API_URL}/api/explore-jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error exploring jobs:', error);
        throw error;
    }
};