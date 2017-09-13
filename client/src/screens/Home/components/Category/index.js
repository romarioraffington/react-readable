// Extneral Dependencies;
import React from 'react';
import { NavLink } from 'react-router-dom';

// Our Dependencies
import styles from './index.scss';

export default ({ categories, pathname}) => {
 
  const isActive = (path) => pathname === path ? 'selected': '';
  return (
    <div className="category-container">
      <h3>Categories</h3>
      <nav>
        <ul>
          <li key={name}>
            <NavLink exact to='/' className={isActive('/')}>
              All
            </NavLink>
          </li>
          { categories && (
            categories.map(({ path, name }) =>
              <li key={name}>
                <NavLink exact to={path} className={isActive(path)}>
                  {name}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  )
}