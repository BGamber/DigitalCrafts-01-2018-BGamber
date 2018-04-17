import React from 'react';
import Title from './Title';
import ConfirmButton from './ConfirmButton';
import CancelButton from './CancelButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import TextEdit from './TextEdit';
import Body from './Body';

let BlogPost = ({
  blog,
  blogBeingEdited,
  blogActions
}) =>
  <div className="post">
    <Title title={blog.title} />
    {
      blogBeingEdited && blogBeingEdited.id === blog.id
        ?
        <div>
          <ConfirmButton blog={blog} confirmEdit={blogActions.confirmEdit} />
          <CancelButton blog={blog} cancelEdit={blogActions.cancelEdit} />
        </div>
        :
        <EditButton blog={blog} editBlog={blogActions.editBlog} />
    }
    <DeleteButton blog={blog} removeBlog={blogActions.removeBlog} />
    {
      blogBeingEdited && blogBeingEdited.id === blog.id &&
      <TextEdit blog={blog} blogBeingEdited={blogBeingEdited} blogActions={blogActions} />
    }
    <Body body={blog.body} />
  </div>

export default BlogPost;