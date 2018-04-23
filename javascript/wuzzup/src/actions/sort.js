import _ from 'lodash';

const CHANGE_SORT = 'CHANGE_SORT';
export let changeSort = (sort) => ({ type: CHANGE_SORT, payload: sort });
changeSort.toString = () => CHANGE_SORT;

export let changeSortReducer = (state, action) =>
  ({
    ...state,
    sortBy: action.payload,
    zups: _.orderBy(state.zups, [(zup) =>
      action.payload === 'name' ? zup.author.name : zup.time],
      [state.orderBy])
  });

const CHANGE_ORDER = 'CHANGE_ORDER';
export let changeOrder = (order) => ({ type: CHANGE_ORDER, payload: order });
changeOrder.toString = () => CHANGE_ORDER;

export let changeOrderReducer = (state, action) => {
  console.log(state.zups);
  return ({
    ...state,
    orderBy: action.payload,
    zups: _.orderBy(state.zups, [(zup) =>
      state.sortBy === 'name' ? zup.author.name : zup.time],
      [action.payload])
  });
};