// Extneral Dependencies
import React from 'react';

// Our Dependencies
import styles from './index.scss';
import { NavLink } from 'react-router-dom';

export default ({ onFilterClick }) => {
  return (
    <div className="filter-container">
      <h3>Filter</h3>
      <ul>
        <li>
          <input
            id="mostVotes"
            type="radio"
            name="filter"
            onClick={(e) => onFilterClick('asc', 'voteScore')}
            defaultChecked={true}
          />
          <label htmlFor="mostVotes">Most</label>
        </li>
        <li className="slash">/</li>
        <li>
          <input
            id="leastVotes"
            type="radio"
            name="filter"
            onClick={(e) => onFilterClick('desc', 'voteScore')}
          />
          <label htmlFor="leastVotes">Least</label>
        </li>
        <li className="votes">(votes)</li>
      </ul>
      <hr className="separator"></hr>
      <ul>
        <li>
          <input
            id="newest"
            type="radio"
            name="filter"
            onClick={(e) => onFilterClick('asc', 'timestamp')}
          />
          <label htmlFor="newest">Newest</label>
        </li>
        <li className="slash">/</li>
        <li>
          <input
            id="oldest"
            type="radio"
            name="filter"
            onClick={(e) => onFilterClick('desc', 'timestamp')}
          />
          <label htmlFor="oldest">Oldest</label>
        </li>
      </ul>
    </div>
  )
}