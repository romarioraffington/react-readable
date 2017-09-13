// Extneral Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import serializeFrom from 'form-serialize';

// Our Dependencies
import style from './index.scss';

// Our Actions
import { fetchPostsAndComments, savePost, updatePost } from 'src/models/Post/actions';
import { togglePostModal } from 'src/models/PostModal/actions';
import { fetchCategories } from 'src/models/Category/actions';

const mapStateToProps = ({ postModal, category }) => ({
  isOpen: postModal.isOpen,
  post: postModal.post,
  categories: category.categories,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    savePost,
    updatePost,
    togglePostModal,
    fetchCategories,
  }, dispatch)
}

class PostModal extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const isOpen = false;
    const { post,categories, updatePost, savePost } = this.props;
    const isEditable = Object.keys(post).length !== 0;
  
    const handleSubmit = (e) => {
      const values = serializeFrom(e.target, { hash: true });
      isEditable ? updatePost(post.id, values) : savePost(values);
    }

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={() => this.props.togglePostModal(isOpen)}
          contentLabel="Post Modal"
          className={{ afterOpen: 'add-post-modal' }}
          overlayClassName={{ afterOpen: 'add-post-modal-overlay' }}
        >
          <div className="header">
            <h2> {isEditable ? '...Edit Post ✍️' : '...Add a Post ✍️'}</h2>
            <span
              onClick={() => this.props.togglePostModal(isOpen)}
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
                defaultValue={isEditable ? post.title : ''}
                required
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                name="author"
                placeholder="Enter the Author"
                defaultValue={isEditable ? post.author : ''}
                disabled={isEditable}
                required
              />
            </fieldset>
            <fieldset>
              <select disabled={isEditable} name="category">
                {
                  categories.map(({ name }) => (
                    <option key={name} value={name}>{name}</option>
                  ))
                }
              </select>
            </fieldset>
            <fieldset>
              <textarea
                name="body"
                placeholder="Write your Post..."
                defaultValue={isEditable ? post.body : ''}
                required
              />
            </fieldset>
            <button type="submit" className="button button--primary">
              {isEditable ? 'Save 👏' : 'Post 👏'}
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostModal);