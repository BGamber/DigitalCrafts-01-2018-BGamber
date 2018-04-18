import React from 'react';
import moment from 'moment';

let Zup = ({ zup, author }) =>
  <div>
    <h1>{zup.title}</h1>
    <p>{author.name} | {moment(zup.time).fromNow()}</p>
  </div>

export default Zup;
