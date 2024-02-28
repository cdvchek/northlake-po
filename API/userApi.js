import api from './axiosInstances';

export const signup = async (usrData) => await api.baseInstance.post('/user/signup', usrData);
export const login = async (usrData) => await api.baseInstance.post('/tokenAuth/login', usrData);