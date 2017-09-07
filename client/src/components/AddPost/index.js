// Extneral Dependencies
import React from 'react';
import Modal from 'react-modal';

// Our Dependencies
import style from './index.scss';

export default ({ isAddPostModalOpen }) => {
  return (
    <div>
      <Modal
        isOpen={true}
        contentLabel="Create a Post"
        className={{
          afterOpen: 'add-post-modal',
        }}
        overlayClassName={{
          afterOpen: 'add-post-modal-overlay ',
        }}>
        <div className="header">
          <h2> ...Add a Post ✍️</h2>
        </div>
        <form>
          <fieldset>
            <input type="text" name="title" placeholder="Enter a Title "/>
          </fieldset>
          <fieldset>
            <input type="text" name="author" placeholder="Enter the Author"/>
          </fieldset>
          <fieldset>
            <textarea name="body" placeholder="Write your Post..."/>
          </fieldset>
          <button type="submit" className="button button--primary">Post 👏</button>
        </form>
      </Modal>
    </div>
  )
}