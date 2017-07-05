import { combineReducers } from "redux";
import { SET_WINDOW_HEIGHT,
  SET_WINDOW_SIZE,
  SET_WINDOW_WIDTH } from "../actions/types";

function windowSize (state = { width: 0, height: 0}, action) {
  switch (action.type) {
    case SET_WINDOW_SIZE:
      return {
        height: action.height,
        width: action.width
      };
    case SET_WINDOW_WIDTH:
      return {
        height: state.height,
        width: action.width
      };
    case SET_WINDOW_HEIGHT:
      return {
        height: action.height,
        width: state.width
      };
    default:
      return state;
  }
}

export default combineReducers({
  windowSize
});
