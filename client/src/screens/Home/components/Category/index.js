// Extneral Dependencies;
import React from 'react';
import { NavLink } from 'react-router-dom';

// Our Dependencies
import styles from './index.scss';

export default ({ categories, isFetching }) => (
  <div className="category-container">
    <h3>Categories</h3>
    <nav>
      <ul>
        {!isFetching && (
          categories.map(({ path, name }) =>
            <li key={name}>
              <NavLink exact to={path} activeClassName="selected">
                {name}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </nav>
  </div>
)