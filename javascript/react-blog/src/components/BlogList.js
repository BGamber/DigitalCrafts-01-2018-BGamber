import React from 'react';
import BlogPost from './BlogPost';

let BlogList = ({ blogs, blogBeingEdited, blogActions }) =>
  <div className="react-list">
    {
      blogs.map(blog => <BlogPost key={`blog${blog.id}`} blog={blog} blogBeingEdited={blogBeingEdited} blogActions={blogActions} />)
    }
  </div>

export default BlogList;