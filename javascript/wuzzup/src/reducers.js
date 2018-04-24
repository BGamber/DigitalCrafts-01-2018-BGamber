import moment from 'moment';
import {
  createZup,
  createZupReducer,
  updateInput,
  updateInputReducer
} from './actions/create';
import {
  changeSort,
  changeSortReducer,
  changeOrder,
  changeOrderReducer
} from './actions/sort';
import {
  fetchAllZups
} from './actions/fetch';

let initialState = {
  zups: [{ title: 'hello', author: { name: 'bgamber', id: 2 }, time: moment('2018-04-23 11:00:00') },
  { title: 'le code stuff', author: { name: 'nybblr', id: 1 }, time: moment('2018-04-23 11:12:00') },
  { title: 'robbyrobbyrobby', author: { name: 'robby', id: 3 }, time: moment('2018-04-23 11:19:00') }],
  activeUser: { name: "bgamber", id: 2 },
  sortBy: 'date',
  orderBy: 'desc',
  inputValue: ''
};

let reducers = {
  [createZup]: createZupReducer,
  [updateInput]: updateInputReducer,
  [changeSort]: changeSortReducer,
  [changeOrder]: changeOrderReducer
};

let fallbackReducer = (state) => state;

export let reducer = (oldState = initialState, action) => {
  let subreducer = reducers[action.type] || fallbackReducer;
  let newState = subreducer(oldState, action);
  return newState;
};
