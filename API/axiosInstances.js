import axios from 'axios';
import LS from '../utils/localstorage';
import { hannahs_house, carsdans_house, danicas_house, jens_house } from '@env';

// Testing Build
const URL_PREFIX = `http://192.168.0.38:3000`;

const baseInstance = axios.create({
    baseURL: URL_PREFIX,
});

const tokenInstance = axios.create({
    baseURL: URL_PREFIX,
});

const fileInstance = axios.create({
    baseURL: URL_PREFIX,
    headers: {
        "Content-Type": 'multipart/form-data',
    }
});

const appendTokenHeader = async (config) => {
    const token = await LS.getAToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Append the auth token to the Authorization header
    }
    
    return config;
}

const handleError = error => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error Response", error.response.data);
        console.error("Error Status", error.response.status);
        console.error("Error Headers", error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request", error.request);
    } else {
        // Something else happened in setting up the request
        console.error("Error Message", error.message);
    }
    return Promise.reject(error);
};

baseInstance.interceptors.request.use((response) => response, (error) => handleError(error));
tokenInstance.interceptors.request.use(appendTokenHeader, (error) => handleError(error));
fileInstance.interceptors.request.use(appendTokenHeader, (error) => handleError(error));

export default {
    baseInstance,
    tokenInstance,
    fileInstance,
};