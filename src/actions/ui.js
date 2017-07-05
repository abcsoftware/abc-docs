import { SET_WINDOW_HEIGHT,
  SET_WINDOW_SIZE,
  SET_WINDOW_WIDTH } from "./types";

export function setWindowHeight (height) {
  return {
    type: SET_WINDOW_HEIGHT,
    height
  };
}

export function setWindowSize (width, height) {
  return {
    height,
    type: SET_WINDOW_SIZE,
    width
  };
}

export function setWindowWidth (width) {
  return {
    type: SET_WINDOW_SIZE,
    width
  };
}
