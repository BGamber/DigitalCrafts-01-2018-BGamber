import moment from 'moment';

const CREATE_ZUP = 'CREATE_ZUP';
export let createZup = (zup, activeUser) => ({ type: CREATE_ZUP, author: activeUser });
createZup.toString = () => CREATE_ZUP;

export let createZupReducer = (state, action) => {
  let newZup = { title: state.inputValue, author: action.author, time: moment() };
  let newState = ({
    ...state,
    inputValue: '',
    zups: state.zups.concat(newZup)
  });
  return newState;
};

const UPDATE_INPUT = 'UPDATE_INPUT';
export let updateInput = (input) => ({ type: UPDATE_INPUT, payload: input });
updateInput.toString = () => UPDATE_INPUT;

export let updateInputReducer = (state, action) => {
  let newState = { ...state, inputValue: action.payload };
  return newState;
}
