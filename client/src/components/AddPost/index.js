// Extneral Dependencies
import React from 'react';
import Modal from 'react-modal';
import serializeFrom from 'form-serialize';

// Our Dependencies
import style from './index.scss';

export default ({ isAddPostModalOpen, togglePostModal, categories, savePost }) => {

  const handleSubmit = (e) => {
    const values = serializeFrom(e.target, { hash: true });
    savePost(values);
  }

  return (
    <div>
      <Modal
        isOpen={isAddPostModalOpen}
        onRequestClose={() => togglePostModal(false)}
        contentLabel="Create a Post"
        className={{
          afterOpen: 'add-post-modal',
        }}
        overlayClassName={{
          afterOpen: 'add-post-modal-overlay ',
        }}>
        <div className="header">
          <h2> ...Add a Post ✍️</h2>
          <span 
            onClick={() => togglePostModal(false)}
            className="close-button">
            x
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input type="text" name="title" placeholder="Enter a Title" />
          </fieldset>
          <fieldset>
            <input type="text" name="author" placeholder="Enter the Author" />
          </fieldset>
          <fieldset>
            <select name="category">
              {
                categories.map(({name}) => (
                  <option key={name} value={name}>{name}</option>
                ))
              }
            </select>
          </fieldset>
          <fieldset>
            <textarea name="body" placeholder="Write your Post..." />
          </fieldset>
          <button type="submit" className="button button--primary">Post 👏</button>
        </form>
      </Modal>
    </div>
  )
}