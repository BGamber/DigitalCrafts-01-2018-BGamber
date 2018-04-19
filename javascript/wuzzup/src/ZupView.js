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

  fetchData() {
    let author = this.props.match.params.author;
    if (author) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${users[author]}`)
        .then(res => res.json())
        .then(body => this.setState({ zups: body }));
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => res.json())
        .then(body => this.setState({ zups: body }));
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    let prevUserSearch = prevProps.match.params.author;
    let currUserSearch = this.props.match.params.author;
    if (prevUserSearch !== currUserSearch) {
      this.setState({ zups: [] });
      this.fetchData();
    }
  }

  render() {
    let postZup = (zupInput) => {
      let updatedZups = this.state.zups;
      let newZup = { userId: "0", title: zupInput, body: "stuff" };
      updatedZups.push(newZup);
      this.setState({ zups: updatedZups });
    }

    return (
      <div className="zup-view">
        <Viewing activeUser={this.props.activeUser} author={this.props.match.params.author} />
        {
          this.props.match.params.author === this.props.activeUser.name ?
            <NewZup postZup={postZup} />
            :
            null
        }
        {
          this.state.zups.length === 0 ?
            <p>Loading...</p>
            :
            <ZupList author={{ name: this.props.match.params.author, id: users[this.props.match.params.author] }} zups={this.state.zups} />
        }
      </div>
    );
  }
}

export default ZupView;
