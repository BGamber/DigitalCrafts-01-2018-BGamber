const { graphql, buildSchema } = require('graphql');

let schema = buildSchema(`
  type Query {
    currentUser: User
  }
  
  type User {
    userId: String
    repos: [Repo]
  }

  type Repo {
    title: String
  }
`);

let query = `
  query {
    currentUser {
      userId
      repos {
        title
      }
    }
  }
`;

let user = {
  userId: '123',
  repos: [
    { title: 'pidot' },
    { title: 'stayathomerobby' }
  ]
}

let resolvers = {
  currentUser: () => user,
  User: {
    userId: (parent) => parent.userId,
    repos: (parent) => parent.repos
  },
  Repo: {
    title: (parent) => parent.title
  }
}

let results = graphql({
  schema,
  source: query,
  rootValue: resolvers
});
results.then((result) => { console.log(JSON.stringify(result)) });