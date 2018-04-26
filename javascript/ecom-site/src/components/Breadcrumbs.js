import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

let Breadcrumbs = ({ query, pathList, props }) =>
  <div className="Breadcrumbs">
    <Link to="/">Home</Link>
    {
      pathList.slice(1).map((path, index) =>
        <div key={'path' + path}>
          <span className="arrow">=></span>
          {
            query &&
              index === pathList.slice(1).length - 1
              ?
              query.title
              : <Link to={'/' + pathList.slice(1, index + 2).join('/')}>
                {path}
              </Link>

          }
        </div>
      )
    }
  </div>

export default connect(
  (state, props) => {
    let pathList = props.location.pathname.split('/');
    let queryId = pathList[2];
    let queryPath = pathList[1];
    let query = (state[queryPath] && (typeof queryPath === typeof Array) ? state[queryPath].find(query =>
      query.id === queryId) : queryPath);
    return { query, pathList, props };
  }
)(Breadcrumbs);
