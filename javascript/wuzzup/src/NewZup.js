import React from 'react';

let NewZup = ({ inputValue, zupInput, zupSubmit }) =>
  <form className="new-form" onSubmit={event => zupSubmit(event)}>
    <input className="new-input" placeholder="Post what's up!" value={inputValue} onChange={event => zupInput(event)} /><button type="submit" className="post-btn" ><i className="material-icons">add</i></button>
  </form>

export default NewZup;
