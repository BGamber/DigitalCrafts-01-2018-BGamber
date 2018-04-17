import React, { Component } from 'react';
import Title from './Title';
import Greeting from './Greeting';
import BlogList from './BlogList';
import Footer from './Footer';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { blogs: [], blogBeingEdited: null }; // Must always be object
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => this.setState({ blogs: json }));
  }

  render() {
    let { blogs, blogBeingEdited } = this.state;

    let editBlog = (blogToEdit) => {
      console.log(`Requested edit of ${blogToEdit.title}`);
      this.setState({ blogBeingEdited: Object.assign({}, blogToEdit) });
    };

    let updateTitle = (blogToEdit, newValue) => {
      blogToEdit.title = newValue;
      this.setState({ blogBeingEdited: blogToEdit });
    };

    let updateBody = (blogToEdit, newValue) => {
      blogToEdit.body = newValue;
      this.setState({ blogBeingEdited: blogToEdit });
    };

    let confirmEdit = (blogToEdit) => {
      console.log(`Confirm edit of ${blogToEdit.title}`);
      let blog = blogs.find(blog => blog.id === blogToEdit.id);
      blog.title = blogBeingEdited.title;
      blog.body = blogBeingEdited.body;
      this.setState({ blogs: blogs, blogBeingEdited: null });
    };

    let cancelEdit = (blogToEdit) => {
      console.log(`Cancel edit of ${blogToEdit.title}`);
      this.setState({ blogBeingEdited: null });
    };

    let removeBlog = (blogToDelete) => {
      console.log(`Requested deletion of ${blogToDelete.title}`);
      let { id } = blogToDelete;
      let prunedBlogs = blogs.filter((blog) => blog.id !== id);
      this.setState({ blogs: prunedBlogs });
    };

    let blogActions = {
      editBlog,
      updateTitle,
      updateBody,
      confirmEdit,
      cancelEdit,
      removeBlog
    };

    return (
      <div className="content">
        <Title title="'Blog' Page" />
        <Greeting person="Ben" />
        <BlogList blogs={blogs} blogBeingEdited={blogBeingEdited} blogActions={blogActions} />
        <Footer />
      </div>
    );
  }
}

export default Page;
