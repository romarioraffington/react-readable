// Extneral Dependencies;
import React from 'react';
import { Link } from 'react-router-dom';

// Our Dependencies
import styles from './index.scss';

export default ({ togglePostModal }) => (
  <div className='top-container'>
    <Link to='/' className='logo'>Readable</Link>
    <button
      onClick={() => togglePostModal(true)}
      className="add-post">
        Add Post
    </button>
  </div>   
)