import React from 'react';

let NewZup = ({ postZup }) =>
  <div className="new-form">
    <input className="new-input" placeholder="Post what's up!"/><button className="post-btn" onClick={() => postZup()}><i className="material-icons">add</i></button>
  </div>

export default NewZup;
