import axios from 'axios';
// http://194.238.22.240:5500
export const apiurl = axios.create({
    baseURL: 'http://194.238.22.240:5500',
    withCredentials: true
})


export const getCookie = (key) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === key) {
            return decodeURIComponent(cookieValue); // Decodes special characters
        }
    }
    return null; // Return null if cookie not found
};

