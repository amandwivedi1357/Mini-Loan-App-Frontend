import axios from 'axios';

// Create a base axios instance with the correct base URL
const API_BASE_URL = 'https://loan-server-three.vercel.app/api';

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true  // Important for handling cookies and CORS
    });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: error.response?.data?.message || 'Login failed'
    });
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
      withCredentials: true
    });

    dispatch({ type: 'LOGOUT_SUCCESS' });
  } catch (error) {
    console.error('Logout failed', error);
  }
};