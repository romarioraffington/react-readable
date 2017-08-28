// Extneral Dependencies;
import React from 'react';

// Our Dependencies
import styles from './index.scss';

export default () => {
  const categories = ['React', 'Redux', 'Udacity'];
  return (
    <div className='category-container'>
      <h3>Categories</h3>
      <ul>
        <li className='category selected' key='All'>All</li>
        { categories.map(category=> (
          <li key={category} className='category'>{category}</li>
        ))}
      </ul>
    </div>   
  )
}