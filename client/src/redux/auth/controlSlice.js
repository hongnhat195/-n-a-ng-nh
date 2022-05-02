import {
    CHANGE_VALUE_REQUEST,
    CHANGE_VALUE_SUCCESS,
    CHANGE_VALUE_FAIL
} from "./../constants/controlDevice"


export const changeReducer = (state = { value: [] }, action) => {
    switch (action.type) {
      case CHANGE_VALUE_REQUEST:
        return {
          loading: true,
        };
      case CHANGE_VALUE_SUCCESS:
        return {
          loading: false,
          userInfo: action.payload,
        };
      case CHANGE_VALUE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };