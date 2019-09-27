import { createStore } from "redux";

import reducer from "./reducer";

const initialValue = {
  currentCity: "kiev"
};
const store = createStore(
  reducer,
  initialValue,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
