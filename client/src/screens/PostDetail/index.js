// External Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import parallel from 'async/parallel';
import serializeFrom from 'form-serialize';

// Our Components
import Filter from 'src/components/Filter';
import { filterComment } from 'src/models/Filter/actions';

// Our Actions
import { fetchPost, votePost, deletePost } from 'src/models/Post/actions';
import { filterComments } from 'src/models/Filter/actions';
import { togglePostModal } from 'src/models/PostModal/actions';
import { 
  fetchComments,
  voteComment, 
  saveComment, 
  deleteComment, 
  editComment, 
  updateComment 
} from 'src/models/Comment/actions';

// Our Dependencies
import styles from './index.scss';
import filter from 'src/app/util/filter';
import formatTimestamp from 'src/app/util/formatTimestamp';

const mapStateToProps = ({ post, comment, filter }) => {
  return {
    post: post.post,
    isFetchingPost: post.isFetching,
    isFetching: post.isFetching,
    filterType: filter.comment,
    comments: comment.comments,
    editingComment: comment.editingComment,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPost,
    fetchComments,
    saveComment,
    voteComment,
    filterComments,
    editComment,
    updateComment,
    deleteComment,
    votePost,
    deletePost,
    togglePostModal,
  }, dispatch)
}

class PostDetail extends Component {
  componentWillMount() {
    const { postId } = this.props.match.params;
    parallel[
      this.props.fetchPost(postId),
      this.props.fetchComments(postId)
    ]
  }

  render() {
    const isOpen = true;
    const { 
      post, 
      isFetchingPost, 
      votePost, 
      comments,
      voteComment,
      filterType,
      editingComment,
    } = this.props;

    const onDeleteComment = (id) => {
      this.props.deleteComment(id)
    }

    const onDeletePost = () => {
      this.props.deletePost(post.id)
      this.props.history.push('/')
    }

    // Mark as editing in progress if a 
    // comment  object is in the state 
    // and the comment is on the current page
    const isEditing = 
      Object.keys(editingComment).length > 0 && 
      !!comments.find(c => c.id === editingComment.id)

    const handleSubmit = (e) => {
      e.preventDefault();

      const values = serializeFrom(e.target, { hash: true });
      isEditing ? 
        this.props.updateComment(editingComment.id, values) : 
        this.props.saveComment({ ...values, parentId: post.id });

      this.formRef.reset();
    }

    const cancelForm = () => {
      this.props.editComment({})
      this.formRef.reset();
    }

    const filteredComments = filter(comments.concat(), filterType.order, filterType.by);

    return (
      <div className="post-detail">
        {
          !isFetchingPost && (
            <div className="container">
              <div id="header" className="header">
                <span className="date">Published: {formatTimestamp(post.timestamp)}</span>
                <h2>{post.title}</h2>
                <p className="author">by {post.author} </p>
                <div className="meta">
                  <div className="likes-container">
                    <span className="likes-count">
                      {post.voteScore > 0 ? `+${post.voteScore}` : post.voteScore}
                    </span>
                    <div className="likes-buttons">
                      <span onClick={() => votePost(post.id, 'upVote')} className="up-vote"></span>
                      <span onClick={() => votePost(post.id, 'downVote')} className="down-vote"></span>
                    </div>
                  </div>
                  <div className="danger-buttons">
                    <div onClick={() => this.props.togglePostModal(isOpen, post)} className="edit-button"></div>
                    <div onClick={onDeletePost} className="delete-button"></div>
                  </div>
                </div>
              </div>

              {/* Page Main Content */}
              <div className="content">
                <p className="description">{post.body}</p>
                <div className="add-comment-container">
                  <form 
                    ref={(el) => this.formRef = el}
                    onSubmit={handleSubmit}
                  >
                    <fieldset>
                      <input  
                        name="author" 
                        type="text" 
                        placeholder="What's your name?" 
                        defaultValue={isEditing ? editingComment.author: ''}
                        className={isEditing && 'edit-mode'}
                        required 
                      />
                    </fieldset>
                    <fieldset>
                      <textarea 
                        name="body" 
                        placeholder="Say something nice..." 
                        defaultValue={isEditing ? editingComment.body: ''} 
                        className={isEditing && 'edit-mode'}
                        required 
                      />
                    </fieldset>
                    <button 
                      type="button" 
                      className="cancel" 
                      onClick={() => cancelForm()}
                    >
                      Cancel
                    </button>
                    <button className="button button--primary" type="submit">
                      { isEditing ? 'Save 🤞' : 'Post 🙌' }
                    </button>
                  </form>
                </div>
        

                {/* All Comments */}
                <div className="comments">
                  <div>
                    { !!filteredComments.length && <h3>Comments</h3> }
                    <ul>
                    {
                      !!filteredComments.length && filteredComments.map(comment => (
                        !comment.deleted && (
                          <ol key={comment.id}>
                            <p>{comment.body}</p>
                            <div className="meta">
                              <span className="author">by {comment.author}</span>
                              <span className="date">{formatTimestamp(comment.timestamp)}</span>
                              <div className="danger-buttons">
                                <a href="#header" 
                                  onClick={() =>  {
                                    this.formRef.reset();
                                    this.props.editComment(comment)
                                  }} 
                                  className="edit-button"
                                ></a>
                                <div onClick={() => onDeleteComment(comment.id)} className="delete-button"></div>
                              </div>
                              <div className="likes-container">
                                <span className="likes-count">
                                  {comment.voteScore > 0 ? `+${comment.voteScore}` : comment.voteScore}
                                </span>
                                <div className="likes-buttons">
                                  <span onClick={() => voteComment(comment.id, 'upVote')} className="up-vote"></span>
                                  <span onClick={() => voteComment(comment.id, 'downVote')} className="down-vote"></span>
                                </div>
                              </div>
                            </div>
                          </ol>
                        )
                    ))}
                    </ul>
                  </div>
                  { !!filteredComments.length  && (
                    <div className="filter-wrapper">
                      <Filter onFilterClick={this.props.filterComments}/>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);