// Extneral Dependencies
import React from 'react';
import Modal from 'react-modal';

// Our Dependencies
import style from './index.scss';

export default ({ isAddPostModalOpen, togglePostModal, categories }) => {

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
        <form>
          <fieldset>
            <input type="text" name="title" placeholder="Enter a Title" required/>
          </fieldset>
          <fieldset>
            <input type="text" name="author" placeholder="Enter the Author" required/>
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
            <textarea name="body" placeholder="Write your Post..." required/>
          </fieldset>
          <button type="submit" className="button button--primary">Post 👏</button>
        </form>
      </Modal>
    </div>
  )
}