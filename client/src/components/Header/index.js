// Extneral Dependencies;
import React from 'react';
import { Link } from 'react-router-dom';

// Our Dependencies
import styles from './index.scss';
import AddPost from 'src/components/AddPost';

export default ({ togglePostModal, isPostModalOpen, categories, savePost }) => (
  <div className='top-container'>
    <Link to='/' className='logo'>Readable</Link>
    <button
      onClick={() => togglePostModal(true)}
      className="add-post">
        Add Post
    </button>
    <AddPost 
      isAddPostModalOpen={isPostModalOpen}
      togglePostModal={togglePostModal}
      savePost={savePost}
      categories={categories}
    />
  </div>   
)