// Extneral Dependencies
import React from 'react';
import Modal from 'react-modal';
import serializeFrom from 'form-serialize';

// Our Dependencies
import style from './index.scss';

export default ({ 
  isAddPostModalOpen, 
  togglePostModal, 
  categories, 
  savePost,
  updatePost, 
  isBeingEdited, 
  post, 
}) => {

  const handleSubmit = (e) => {
    const values = serializeFrom(e.target, { hash: true });
    isBeingEdited ? updatePost(post.id, values) : savePost(values);
  }

  return (
    <div>
      <Modal
        isOpen={isAddPostModalOpen}
        onRequestClose={() => togglePostModal(false)}
        contentLabel="Post Modal"
        className={{ afterOpen: 'add-post-modal' }}
        overlayClassName={{ afterOpen: 'add-post-modal-overlay' }}>
        <div className="header">
          <h2> { isBeingEdited ? '...Edit Post ✍️' : '...Add a Post ✍️'}</h2>
          <span 
            onClick={() => togglePostModal(false)}
            className="close-button">
            x
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter a Title" 
              defaultValue={isBeingEdited ? post.title: ''}
              required
            />
          </fieldset>
          <fieldset>
            <input 
              type="text" 
              name="author" 
              placeholder="Enter the Author" 
              defaultValue={isBeingEdited ? post.author: ''}
              disabled={isBeingEdited}
              required
            />
          </fieldset>
          <fieldset>
            <select disabled={isBeingEdited} name="category">
              {
                categories.map(({name}) => (
                  <option key={name} value={name}>{name}</option>
                ))
              }
            </select>
          </fieldset>
          <fieldset>
            <textarea 
              name="body" 
              placeholder="Write your Post..." 
              defaultValue={isBeingEdited ? post.body: ''}
              required
            />
          </fieldset>
          <button type="submit" className="button button--primary">
            { isBeingEdited ?  'Save 👏' : 'Post 👏' }
          </button>
        </form>
      </Modal>
    </div>
  )
}