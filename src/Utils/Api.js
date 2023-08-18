import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/user';

const Api = {
    registration: async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/registration`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    login: async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUsers: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getusers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (data) => {
        try {
            const response = await axios.put(`${BASE_URL}/userUpdate`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await axios.post(`${BASE_URL}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default Api;
