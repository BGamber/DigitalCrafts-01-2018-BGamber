const root = document.querySelector('.react-root');
const h = React.createElement;

let blogs = [
  { id: '1', title: 'Hello World', author: 'Jonathan', date: "4-11-2018", body: 'Lorem Ipsum Sit Dolor Amet' },
  { id: '2', title: 'Bacon Ipsum', author: 'Ben', date: "4-11-2018", body: "Loading..." },
  { id: '3', title: 'React Demo', author: 'Ben', date: "4-11-2018", body: 'Building Blog Examples Using React' },
  { id: '4', title: 'Home Stretch', author: 'Ben', date: "4-11-2018", body: '5 1/2 weeks left!' }
];

let blogBeingEdited = null;

let Greeting = ({ person }) =>
  h('h1', { className: 'header' }, `Hello, ${person}!`);

let Message = () =>
  h('p', {}, 'This page is "React-ful"!');

let Footer = () =>
  h('footer', null, [h(Message, null, []), 'Copyright 2020']);

let Title = ({ title }) =>
  h('span', { className: "title" }, title);

let editBlog = (blogToEdit) => {
  console.log(`Requested edit of ${blogToEdit.title}`);
  blogBeingEdited = Object.assign({}, blogToEdit);
  // update();
};

let EditButton = (blog) =>
  h('button', { onClick: () => { editBlog(blog) }, className: 'edit-btn' }, [h('i', { className: "material-icons" }, ['edit'])]);

let updateTitle = (blogToEdit, newValue) => {
  blogToEdit.title = newValue;
  // update();
};

let updateBody = (blogToEdit, newValue) => {
  blogToEdit.body = newValue;
  // update();
};

let confirmEdit = (blogToEdit) => {
  console.log(`Confirm edit of ${blogToEdit.title}`);
  let blog = blogs.find(blog => blog.id === blogToEdit.id);
  blog.title = blogBeingEdited.title;
  blog.body = blogBeingEdited.body;
  blogBeingEdited = null;
  // update();
};

let cancelEdit = (blogToEdit) => {
  console.log(`Cancel edit of ${blogToEdit.title}`);
  blogBeingEdited = null;
  // update();
}

let ConfirmButton = (blog) =>
  h('button', { onClick: () => { confirmEdit(blog) }, className: 'edit-btn' }, [h('i', { className: "material-icons" }, ['check'])]);

let CancelButton = (blog) =>
  h('button', { onClick: () => { cancelEdit(blog) }, className: 'cncl-btn' }, [h('i', { className: "material-icons" }, ['cancel'])]);

let removeBlog = (blogToDelete) => {
  console.log(`Requested deletion of ${blogToDelete.title}`);
  let { id } = blogToDelete;
  blogs = blogs.filter((blog) => id !== blog.id);
  // update();
};

let DeleteButton = (blog) =>
  h('button', { onClick: () => { removeBlog(blog) }, className: 'big-red' }, [h('i', { className: "material-icons" }, ['delete'])]);

let Credit = ({ author, date }) =>
  h('div', { className: "credit" }, [h('span', null, `${author}: ${date}`)]);

let Body = ({ body }) =>
  h('div', { className: "body" }, `${body}`);

let TextEdit = (blog) =>
  [h('input', { className: "textedit", value: blogBeingEdited.title, onChange: ((event) => updateTitle(blogBeingEdited, event.target.value)) }),
  h('input', { className: "textedit", value: blogBeingEdited.body, onChange: ((event) => updateBody(blogBeingEdited, event.target.value)) })];

let BlogPost = (blog, blogBeingEdited) =>
  h('div', { className: "post" }, [
    h(Title, { title: blog.title }, []),
    (blogBeingEdited && blogBeingEdited.id === blog.id && [h(ConfirmButton, blog), h(CancelButton, blog)])
    || h(EditButton, blog),
    h(DeleteButton, blog),
    h(Credit, { author: blog.author, date: blog.date }, []),
    blogBeingEdited && blogBeingEdited.id === blog.id && h(TextEdit, blog, []),
    h(Body, { body: blog.body }, [])
  ]);

let BlogList = ({ blogs, blogBeingEdited }) => h('div', { className: "react-list" }, blogs.map(post => h(BlogPost, { post, blogBeingEdited })));

// let Page = ({ blogs }) => h('div', { className: "content" }, [
//   h(Title, { title: '"Blog" Page' }, []),
//   h(Greeting, { person: 'Ben' }, []),
//   h(BlogList, { blogs }, []),
//   h(Footer, null, [])
// ]);

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blogs: blogs, blogBeingEdited: null }; // Must always be object

    // setTimeout(() => {
    //   let blogs = this.state.blogs.slice();
    //   blogs.pop();
    //   this.setState({ blogs: blogs });
    // }, 2000);
  }

  render() {
    let { blogs, blogBeingEdited } = this.state;

    return h('div', { className: "content" }, [
      h(Title, { title: '"Blog" Page' }, []),
      h(Greeting, { person: 'Ben' }, []),
      h(BlogList, { blogs, blogBeingEdited }, []),
      h(Footer, null, [])
    ]);
  }
}

// let update = () => {
//   ReactDOM.render(h(Page, { blogs: blogs }, []), root);
// };
ReactDOM.render(h(Page), root);

// update();

// let getBacon = fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&start-with-lorem=1');
// getBacon.then(res => res.json()).then(data => blogs[1].body = data[0]).then(() => update());