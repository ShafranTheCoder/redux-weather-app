import { SET_CITY } from "./actionNames";
export default function(state, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        currentCity: action.payload
      };
    default:
      return state;
  }
}
