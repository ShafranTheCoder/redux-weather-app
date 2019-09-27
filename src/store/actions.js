import { SET_CITY } from "./actionNames";

export function setCity(payload) {
  return {
    type: SET_CITY,
    payload
  };
}
