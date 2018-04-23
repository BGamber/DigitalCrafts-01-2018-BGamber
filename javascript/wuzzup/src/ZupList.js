import React from 'react';
import Zup from './Zup';

let ZupList = ({ author, zups, users }) =>
  <div className="zup-list">
    {
      author.id !== undefined ?
      zups.map((zup, index) => author.id === zup.author.id ?
        <Zup key={`zup${index}`} zup={zup} />
        :
        null)
      :
      zups.map((zup, index) => <Zup key={`zup${index}`} zup={zup} />)
    }
  </div>

export default ZupList;
