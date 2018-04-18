import React from 'react';
import moment from 'moment';

let Zup = ({ zup }) =>
  <div>
    <h1>{zup.body}</h1>
    <p>{zup.author} | {moment(zup.time).fromNow()}</p>
  </div>

export default Zup;
