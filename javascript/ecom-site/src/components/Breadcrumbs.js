import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

let Breadcrumbs = ({ category, props }) =>
  <div className="Breadcrumbs">
    <Link to="/">Home</Link>
    {
      props.location.pathname.split('/').slice(1).map((path, index) =>
        <div key={'path' + path}>
          <span className="arrow">=></span>
          {
            index === props.location.pathname.split('/').slice(1).length - 1 &&
              category !== undefined ?
              category.name
              : <Link to={'/' + path}>
                {path}
              </Link>

          }
        </div>
      )
    }
  </div>

export default connect(
  (state, props) => {
    let categoryId = Number(props.location.pathname.split('/')[2]);
    let category = state.categories.find(category =>
      category.id === categoryId);
    return { category, props };
  }
)(Breadcrumbs);
