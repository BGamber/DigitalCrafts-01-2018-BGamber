import React, { Component } from 'react';
import Viewing from './Viewing';
import NewZup from './NewZup';
import ZupList from './ZupList';

// let zups = [
//   { author: "nybblr", body: "Wrote some code", time: "2018-04-17 12:18:00" },
//   { author: "bgamber", body: "Made some tea", time: "2018-04-17 13:28:00" },
//   { author: "robby", body: "Robby Robby Robby", time: "2018-04-17 13:40:00" },
//   { author: "bgamber", body: "Using React to build a 'one-page' app", time: "2018-04-17 14:58:00" },
//   { author: "nybblr", body: "Taught a lecture", time: "2018-04-17 15:02:00" },
//   { author: "robby", body: "Hosting podcast at stayathomerobby.com", time: "2018-04-17 15:30:00" }
// ];
// let zups = [
//   { userId: 1, body: "Wrote some code", time: "2018-04-17 12:18:00" },
//   { userId: 2, body: "Made some tea", time: "2018-04-17 13:28:00" },
//   { userId: 3, body: "Robby Robby Robby", time: "2018-04-17 13:40:00" },
//   { userId: 2, body: "Using React to build a 'one-page' app", time: "2018-04-17 14:58:00" },
//   { userId: 1, body: "Taught a lecture", time: "2018-04-17 15:02:00" },
//   { userId: 3, body: "Hosting podcast at stayathomerobby.com", time: "2018-04-17 15:30:00" }
// ];

let users = {
  "nybblr": 1,
  "bgamber": 2,
  "robby": 3
};

// let ZupView = ({ match }) =>
//   <div className="ZupView">
//     <Viewing author={match.params.author} />
//     <ZupList author={match.params.author} zups={zups} />
//   </div>

class ZupView extends Component {
  constructor(props) {
    super(props);
    this.state = { zups: [] };
  }

  componentDidMount() {
    let getPosts = fetch(`https://jsonplaceholder.typicode.com/posts`);
    getPosts
      .then(res => res.json())
      .then(body => this.setState({ zups: body }));
  }

  render() {
    return (
      <div className="zup-view">
        <Viewing activeUser={this.props.activeUser} author={this.props.match.params.author} />
        {
          this.props.match.params.author === this.props.activeUser.name ?
            <NewZup />
            :
            null
        }
        <ZupList author={{ name: this.props.match.params.author, id: users[this.props.match.params.author] }} zups={this.state.zups} />
      </div>
    );
  }
}

export default ZupView;
