import React from 'react';
import Zup from './Zup';

let ZupList = ({ author, zups }) =>
  <div>
    {
      author !== undefined ?
      zups.map((zup, index) => author === zup.author.toLowerCase() ?
        <Zup key={`zup${index}`} zup={zup} />
        :
        '')
      :
      zups.map((zup, index) => <Zup key={`zup${index}`} zup={zup} />)
    }
  </div>

export default ZupList;
