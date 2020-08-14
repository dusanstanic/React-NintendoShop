import * as actionTypes from "../actions/gameDisplay";

const initialState = {
  counter: 0,
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
};

export default reducer;
