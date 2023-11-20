import axios from "axios";

const hannahsHouse = "192.168.1.117";
const carsdansHouse = "192.168.0.38";
const ucf = "10.32.235.12";
const duo58 = "192.169.141.67";

// Testing Build
const URL_PREFIX = `http://${carsdansHouse}:3000`;

// Deployed Build
// const URL_PREFIX = "https://something.herokuapp.com/"

const API = {
    signup: (usrData) => {
        return axios.post(`${URL_PREFIX}/user/signup`, usrData);
    },
    login: (usrData) => {
        return axios.post(`${URL_PREFIX}/tokenAuth/login`, usrData);
    },
    logout: (rTkn) => {
        return axios.delete(`${URL_PREFIX}/tokenAuth/logout`, { data: { refreshToken: rTkn }});
    },
    checkAccessToken: (aTkn) => {
        return axios.get(`${URL_PREFIX}/tokenAuth/checkaccesstoken`, {
            headers: {
                "Authorization": `Bearer ${aTkn}`
            }
        });
    },
    getAccessToken: (rTkn) => {
        return axios.post(`${URL_PREFIX}/tokenAuth/accesstoken`, {refreshToken: rTkn});
    },
    getMyExpenses: (aTkn) => {
        return axios.get(`${URL_PREFIX}/expenses/myexpenses`, {
            headers: {
                "Authorization": `Bearer ${aTkn}`
            }
        });
    },
    getAllExpenses: (aTkn) => {
        return axios.get(`${URL_PREFIX}/expenses/allexpenses`, {
            headers: {
                "Authorization": `Bearer ${aTkn}`
            }
        });
    },
    getExpense: (aTkn, id) => {
        return axios.get(`${URL_PREFIX}/expenses/expense-${id}`, {
            headers: {
                "Authorization": `Bearer ${aTkn}`
            }
        });
    },
    createExpense: (aTkn, formData) => {
        return axios.post(`${URL_PREFIX}/expenses/newexpense`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${aTkn}`
            }
        });
    },
    getImageUrl: (aTkn, expenseId) => {
        return axios.get(`${URL_PREFIX}/expenses/image-${expenseId}`, {
            headers: {
                "Authorization": `Bearer ${aTkn}`
            }
        });
    },
    editExpense: (aTkn, expenseData, expenseId) => {
        return axios.put(`${URL_PREFIX}/expenses/${expenseId}`, expenseData, {
            headers: {
                "Authorization": `Bearer ${aTkn}`
            }
        });
    },
    editExpensePhoto: (aTkn, formData, expenseId) => {
        return axios.put(`${URL_PREFIX}/expenses/image/${expenseId}`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${aTkn}`
            }
        });
    },
}

export default API;