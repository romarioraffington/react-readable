// Extneral Dependencies;
import React from 'react';
import { Link } from 'react-router-dom';

// Our Dependencies
import styles from './index.scss';

export default ({ pathname, togglePostModal }) => {
  const isOpen = true;
  
  return (
    <div className='top-container'>
      <Link to='/' className='logo'>Readable</Link>

      { pathname === '/' && (
        <button
          onClick={() => togglePostModal(isOpen)}
          className="add-post">
            Add Post
        </button>
      )}
    </div>  
  )
}