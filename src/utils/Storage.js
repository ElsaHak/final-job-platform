


export const getItem = (key) => {
    return localStorage.getItem(key);
};


export const setItem = (key, value) => {
    localStorage.setItem(key, value);
};


export const removeItem = (key) => {
    localStorage.removeItem(key);
};


export const getJobs = () => {
    try {
        return JSON.parse(localStorage.getItem('jobs')) || [];
    } catch (error) {
        console.error('Error parsing jobs from localStorage:', error);
        return [];
    }
};


export const saveJobs = (jobs) => {
    try {
        localStorage.setItem('jobs', JSON.stringify(jobs));
    } catch (error) {
        console.error('Error saving jobs to localStorage:', error);
    }
};


export const getApplications = () => {
    try {
        return JSON.parse(localStorage.getItem('applications')) || [];
    } catch (error) {
        console.error('Error parsing applications from localStorage:', error);
        return [];
    }
};


 
export const saveApplications = (applications) => {
    try {
        localStorage.setItem('applications', JSON.stringify(applications));
    } catch (error) {
        console.error('Error saving applications to localStorage:', error);
    }
};
