// userActions.js

import axios from "axios";



export const getUserProfile = () => {
 
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_PROFILE_REQUEST" });

      // Make an API request to fetch the user profile
      const response = await axios.get("http://localhost:5000/api/users/profile");

      dispatch({
        type: "USER_PROFILE_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "USER_PROFILE_FAILURE",
        payload: error.message,
      });
    }
  };
};

export const updateUserProfile = (updatedProfile, userId) => {

  return async (dispatch) => {
    try {
      dispatch({ type: "USER_UPDATE_REQUEST" });

      // Make an API/users request to update the user profile
      const response = await axios.patch(`http://localhost:5000/api/users/profile/${userId}`, updatedProfile);

      dispatch({
        type: "USER_UPDATE_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "USER_UPDATE_FAILURE",
        payload: error.message,
      });
    }
  };
};
