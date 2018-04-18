import React, { Component } from 'react';
import Viewing from './Viewing';
import NewZup from './NewZup';
import ZupList from './ZupList';

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
