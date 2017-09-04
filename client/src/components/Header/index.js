// Extneral Dependencies;
import React from 'react';
import { Link } from 'react-router-dom';

// Our Dependencies
import styles from './index.scss';

export default () => (
  <div className='top-container'>
    <Link to='/' className='logo'>Readable</Link>
    <a className="add-post">Add Post</a>
  </div>   
)