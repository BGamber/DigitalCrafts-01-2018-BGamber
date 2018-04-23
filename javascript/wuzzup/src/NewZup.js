import React from 'react';
import { createZup, updateInput } from './actions/create';

let NewZup = ({ inputValue, dispatch, activeUser }) =>
  <form className="new-form" onSubmit={event => { event.preventDefault(); dispatch(createZup(inputValue, activeUser)); }}>
    <input className="new-input" placeholder="Post what's up!" value={inputValue} onChange={event => { dispatch(updateInput(event.target.value)); }} /><button type="submit" className="post-btn" ><i className="material-icons">add</i></button>
  </form>

export default NewZup;
