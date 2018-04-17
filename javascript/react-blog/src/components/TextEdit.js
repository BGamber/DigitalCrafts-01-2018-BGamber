import React from 'react';

let TextEdit = ({ blog, blogBeingEdited, blogActions }) =>
  <div>
    <input
      key="edittitle"
      className="textedit"
      value={blogBeingEdited.title}
      onChange={(event) => blogActions.updateTitle(blogBeingEdited, event.target.value)} />
    <input
      key="editbody"
      className="textedit"
      value={blogBeingEdited.body}
      onChange={(event) => blogActions.updateBody(blogBeingEdited, event.target.value)} />
  </div>

export default TextEdit;