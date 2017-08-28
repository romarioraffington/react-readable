// Extneral Dependencies;
import React from 'react';

// Our Dependencies
import styles from './index.scss';

export default () => {
  return (
    <div className='filter-container'>
      <h3>Filter</h3>
      <div className="filters">
        <div className="filter">
          <span className="most selected">Most</span>
          <span className="slash">/</span>
          <span className="least">Least</span>
          <span className="votes">(votes)</span>
        </div>
        <div className="filter">
          <span className="most selected">Newest</span>
          <span className="slash">/</span>
          <span className="least">Oldest</span>
        </div>
      </div>
    </div>   
  )
}