import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

let CatNav = ({ categories }) =>
  <div className="cat-nav">
    {
      categories.map(cat =>
        <div key={'catnav' + cat.title}>
          <Link className="cat-list"
            to={`/categories/${cat.id}`}>
            {cat.title}
          </Link>
          <p>{cat.description}</p>
        </div>
      )
    }
  </div>

export default connect(
  (state, props) => {
    return { categories: state.categories };
  }
)(CatNav);
