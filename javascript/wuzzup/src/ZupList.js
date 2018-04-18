import React from 'react';
import Zup from './Zup';

let ZupList = ({ author, zups, users }) =>
  <div className="zup-list">
    {
      author.name !== undefined ?
      zups.map((zup, index) => author.id === zup.userId ?
        <Zup key={`zup${index}`} zup={zup} author={author} />
        :
        null)
      :
      zups.map((zup, index) => <Zup key={`zup${index}`} zup={zup} author={author} />)
    }
  </div>

export default ZupList;
