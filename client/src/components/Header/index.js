// Extneral Dependencies;
import React from 'react';
import { Link } from 'react-router-dom';

// Our Dependencies
import styles from './index.scss';
import AddPost from 'src/components/AddPost';

export default ({ togglePostModal, isPostModalOpen }) => (
  <div className='top-container'>
    <Link to='/' className='logo'>Readable</Link>
    <a 
      onClick={() => togglePostModal(true)}
      className="add-post">
        Add Post
    </a>
    <AddPost isAddPostModalOpen={isPostModalOpen} />
  </div>   
)