import React from 'react';
import Viewing from './Viewing';
import NewZup from './NewZup';
import ZupList from './ZupList';

import { connect } from 'react-redux';

let users = {
  "nybblr": 1,
  "bgamber": 2,
  "robby": 3
};

let ZupView = (props) => {
  return (
    <div className="zup-view">
      <Viewing activeUser={props.activeUser} author={props.match.params.author} />
      {
        props.match.params.author === props.activeUser.name ?
          <NewZup inputValue={props.inputValue} /*zupInput={zupInput} zupSubmit={zupSubmit}*/ />
          :
          null
      }
      <select
        value={props.sortBy}
        onChange={event => props.dispatch({ type: 'CHANGE_SORT', body: event.target.value })}>
        <option value="date">By Date</option>
        <option value="name">By Name</option>
      </select> <select
        value={props.orderBy}
        onChange={event => props.dispatch({ type: 'CHANGE_ORDER', body: event.target.value })}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <button onClick={event => props.dispatch({ type: 'FETCH_ALL_ZUPS' })}>Load</button>
      {
        props.zups.length === 0 ?
          <p>Loading...</p>
          :
          <ZupList
            author={{
              name: props.match.params.author,
              id: users[props.match.params.author]
            }}
            zups={props.zups} />
      }
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    zups: state.zups,
    activeUser: state.activeUser,
    sortBy: state.sortBy,
    orderBy: state.orderBy
  };
};

let mapDispatchToProps = (dispatch) => {
  return { dispatch: dispatch };
};

let ZupViewSmart = connect(
  mapStateToProps,
  mapDispatchToProps
)(ZupView);

//  EXAMPLE OF CONNECTED COMPONENT SETUP
// let ScreenDumb = ({ zups, dispatch }) => <div><button onClick={() => dispatch({ type: 'CREATE_ZUP', body: "Hi there!" })}>Click me!</button><p>{zups.toString()}</p></div>

// let Screen = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ScreenDumb);

/*
class ZupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zups: [],
      sortBy: 'date',
      orderBy: 'desc',
      inputValue: ''
    };
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
    };
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
    };
  }

  render() {
    let { zups, sortBy, orderBy, inputValue } = this.state;

    let sortedZups = sort(zups, sortBy);
    if (orderBy === "desc") sortedZups.reverse();

    let zupInput = (event) => {
      this.setState({ inputValue: event.target.value });
    };

    let zupSubmit = (event) => {
      event.preventDefault();
      if (inputValue.length > 0) {
        let newZup = { userId: this.props.activeUser.id, title: inputValue, body: "stuff", date: new Date() };
        this.setState(state => ({ zups: state.zups.concat(newZup), inputValue: '' }));
      };
    };

    return (
      <div className="zup-view">
        <Viewing activeUser={this.props.activeUser} author={this.props.match.params.author} />
        {
          this.props.match.params.author === this.props.activeUser.name ?
            <NewZup inputValue={inputValue} zupInput={zupInput} zupSubmit={zupSubmit} />
            :
            null
        }
        <select
          value={sortBy}
          onChange={event => this.setState({ sortBy: event.target.value })}>
          <option value="date">By Date</option>
          <option value="name">By Name</option>
        </select> <select
          value={orderBy}
          onChange={event => this.setState({ orderBy: event.target.value })}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        {
          zups.length === 0 ?
            <p>Loading...</p>
            :
            <ZupList author={{ name: this.props.match.params.author, id: users[this.props.match.params.author] }} zups={zups} />
        }
      </div>
    );
  }
}
*/

export default ZupViewSmart;
