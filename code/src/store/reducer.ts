import { initialState } from "./state";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_NOTIFY":
      return { ...state, notify: action.payload };
    default:
      return state;
  }
};

export { rootReducer };
