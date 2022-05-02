import {
    CHANGE_VALUE_REQUEST,
    CHANGE_VALUE_SUCCESS,
    CHANGE_VALUE_FAIL
} from "./../constants/controlDevice"
import axios from "axios";

export const changeValue = (name, value) => async (dispatch) => {
    try {
      dispatch({
        type: CHANGE_VALUE_REQUEST,
      });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/device/setStatus",
        { name: name, value: value },
        config
      );
      console.log(data);
      dispatch({
        type: CHANGE_VALUE_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: CHANGE_VALUE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };