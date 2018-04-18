import React, { Component } from 'react';
import Viewing from './Viewing';
import NewZup from './NewZup';
import ZupList from './ZupList';

let zups = [
  { author: "nybblr", body: "Wrote some code", time: "2018-04-17 12:18:00" },
  { author: "bgamber", body: "Made some tea", time: "2018-04-17 13:28:00" },
  { author: "robby", body: "Robby Robby Robby", time: "2018-04-17 13:40:00" },
  { author: "bgamber", body: "Using React to build a 'one-page' app", time: "2018-04-17 14:58:00" },
  { author: "nybblr", body: "Taught a lecture", time: "2018-04-17 15:02:00" },
  { author: "robby", body: "Hosting podcast at stayathomerobby.com", time: "2018-04-17 15:30:00" }
];

// let ZupView = ({ match }) =>
//   <div className="ZupView">
//     <Viewing author={match.params.author} />
//     <ZupList author={match.params.author} zups={zups} />
//   </div>

class ZupView extends Component {
  constructor(props) {
    super(props);
    this.state = { zups: zups, author: null };
  }

  // componentDidMount() {
  //   let getPosts = fetch(`https://jsonplaceholder.typicode.com/posts`);
  //   getPosts
  //     .then(res => res.json())
  //     .then(body => this.setState({ zups: body }));
  // }

  render() {
    return (
      <div className="ZupView">
        <Viewing activeUser={this.props.activeUser} author={this.props.match.params.author} />
        {
          this.props.match.params.author === this.props.activeUser ?
            <NewZup />
            :
            null
        }
        <ZupList author={this.props.match.params.author} zups={this.state.zups} />
      </div>
    );
  }
}

export default ZupView;
