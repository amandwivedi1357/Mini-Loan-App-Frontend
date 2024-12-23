import axios from 'axios';
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGOUT_SUCCESS 
} from './types';

// Create a base axios instance with the correct base URL
const API_BASE_URL = 'https://loan-server-three.vercel.app/api';

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true  // Important for handling cookies and CORS
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || 'Login failed'
    });
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
      withCredentials: true
    });

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error('Logout failed', error);
  }
};