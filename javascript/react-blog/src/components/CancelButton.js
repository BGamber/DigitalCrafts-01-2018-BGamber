import React from 'react';

let CancelButton = ({ blog, cancelEdit }) =>
  <button onClick={() => cancelEdit(blog)} className="cncl-btn"><i className="material-icons">cancel</i></button>

export default CancelButton;