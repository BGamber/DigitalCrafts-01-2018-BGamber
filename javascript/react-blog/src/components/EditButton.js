import React from 'react';

let EditButton = ({ blog, editBlog }) =>
  <button onClick={() => editBlog(blog)} className="edit-btn"><i className="material-icons">edit</i></button>

export default EditButton;