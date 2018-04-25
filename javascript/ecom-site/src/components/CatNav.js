import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

let CatNav = ({ categories }) =>
  <div className="cat-nav">
    {
      categories.map(cat =>
        <div key={'catnav' + cat.id}>
          <Link className="cat-list"
            to={`/categories/${cat.id}`}>
            {cat.name}
          </Link>
          <p>{cat.name} and stuff!</p>
        </div>
      )
    }
  </div>

export default connect(
  (state, props) => {
    return { categories: state.categories };
  }
)(CatNav);
