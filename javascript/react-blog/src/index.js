import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

let Greeting = ({ person }) =>
  <h1 className="header">Hello, {person}!</h1>

let Message = () =>
  <p>This page is "React-ful"!</p>

let Footer = () =>
  <footer>
    <Message />
    Copyright 2020
  </footer>

let Title = ({ title }) =>
  <span className="title">{title}</span>

let EditButton = ({ blog, editBlog }) =>
  <button onClick={() => editBlog(blog)} className="edit-btn"><i className="material-icons">edit</i></button>

let ConfirmButton = ({ blog, confirmEdit }) =>
  <button onClick={() => confirmEdit(blog)} className="edit-btn"><i className="material-icons">check</i></button>

let CancelButton = ({ blog, cancelEdit }) =>
  <button onClick={() => cancelEdit(blog)} className="cncl-btn"><i className="material-icons">cancel</i></button>

let DeleteButton = ({ blog, removeBlog }) =>
  <button onClick={() => removeBlog(blog)} className="big-red"><i className="material-icons">delete</i></button>

let Body = ({ body }) =>
  <div className="body">{body}</div>

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

let BlogList = ({ blogs, blogBeingEdited, blogActions }) =>
  <div className="react-list">
    {
      blogs.map(blog => <BlogPost key={`blog${blog.id}`} blog={blog} blogBeingEdited={blogBeingEdited} blogActions={blogActions} />)
    }
  </div>

class Page extends React.Component {
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

ReactDOM.render(<Page />, document.getElementById('root'));
