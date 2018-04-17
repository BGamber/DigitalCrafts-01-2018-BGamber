import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

let h = React.createElement;

const blogs = [
  { id: '1', title: 'Hello World', author: 'Jonathan', date: "4-11-2018", body: 'Lorem Ipsum Sit Dolor Amet' },
  { id: '2', title: 'Bacon Ipsum', author: 'Ben', date: "4-11-2018", body: "Bacon ipsum dolor amet quis laborum commodo ad mollit esse. Pork loin dolore leberkas, in ball tip cillum consequat." },
  { id: '3', title: 'React Demo', author: 'Ben', date: "4-11-2018", body: 'Building Blog Examples Using React' },
  { id: '4', title: 'Home Stretch', author: 'Ben', date: "4-11-2018", body: '5 1/2 weeks left!' }
];

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

let Credit = ({ author, date }) =>
  <div className="credit"><span>{`${author}: ${date}`}</span></div>

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
      blogBeingEdited && blogBeingEdited.id === blog.id &&
      <div>
        <ConfirmButton blog={blog} confirmEdit={blogActions.confirmEdit} />
        <CancelButton blog={blog} cancelEdit={blogActions.cancelEdit} />
      </div>
      ||
      <EditButton blog={blog} editBlog={blogActions.editBlog} />
    }
    <DeleteButton blog={blog} removeBlog={blogActions.removeBlog} />
    <Credit author={blog.author} date={blog.date} />
    {
      blogBeingEdited && blogBeingEdited.id === blog.id &&
      <TextEdit blog={blog} blogBeingEdited={blogBeingEdited} blogActions={blogActions} />
    }
    <Body body={blog.body} />
  </div>

let BlogList = ({ blogs, blogBeingEdited, blogActions }) =>
  <div className="react-list">
    {
      blogs.map(blog => <BlogPost blog={blog} blogBeingEdited={blogBeingEdited} blogActions={blogActions} />)
    }
  </div>

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogs: blogs, blogBeingEdited: null }; // Must always be object
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
