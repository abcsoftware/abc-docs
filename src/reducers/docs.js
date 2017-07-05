import { combineReducers } from "redux";
import { RECEIVE_DOCS,
  RECEIVE_TOC,
  REQUEST_DOCS,
  REQUEST_TOC } from "../actions/types";

function fileName (state = "", action) {
  switch (action.type) {
    case REQUEST_DOCS:
      return action.fileName;
    default:
      return state;
  }
}

function markdown (state = "#### Nothing to see here", action) {
  switch (action.type) {
    case RECEIVE_DOCS:
      return action.markdown;
    case REQUEST_DOCS:
      return "";
    default:
      return state;
  }
}

function toc (state = "", action) {
  switch (action.type) {
    case RECEIVE_TOC:
      return action.markdown;
    case REQUEST_TOC:
      return "";
    default:
      return state;
  }
}

export default combineReducers({
  fileName,
  markdown,
  toc
});
