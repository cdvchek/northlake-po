import api from './axiosInstances';

export const logout = async (rtkn) => await api.baseInstance.delete('/tokenAuth/logout', { data: { refreshToken: rtkn }});
export const checkAccessToken = async () => await api.tokenInstance.get('/tokenAuth/checkaccesstoken');
export const getAccessToken = async (rtkn) => await api.baseInstance.post('/tokenAuth/accesstoken', { refreshToken: rtkn });