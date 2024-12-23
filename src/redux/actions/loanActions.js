import axios from 'axios';

const API_BASE_URL = 'https://loan-server-three.vercel.app/api';

export const createLoan = (loanData) => async (dispatch) => {
  try {
    dispatch({ type: 'LOAN_CREATE_REQUEST' });
    
    const response = await axios.post(`${API_BASE_URL}/loans/create`, loanData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });

    dispatch({
      type: 'LOAN_CREATE_SUCCESS',
      payload: response.data
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: 'LOAN_CREATE_FAIL',
      payload: error.response?.data?.message || 'Loan creation failed'
    });
    throw error;
  }
};

export const fetchLoans = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOANS_FETCH_REQUEST' });
    
    const response = await axios.get(`${API_BASE_URL}/loans`, {
      withCredentials: true
    });

    dispatch({
      type: 'LOANS_FETCH_SUCCESS',
      payload: response.data
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: 'LOANS_FETCH_FAIL',
      payload: error.response?.data?.message || 'Failed to fetch loans'
    });
    throw error;
  }
};