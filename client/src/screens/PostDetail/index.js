// External Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import parallel from 'async/parallel';
import serializeFrom from 'form-serialize';

// Our Components
import Filter from 'src/components/Filter';

// Our Actions
import { fetchPost, votePost, deletePost } from 'src/models/Post/actions';
import { fetchComments, voteComment, saveComment, deleteComment } from 'src/models/Comment/actions';
import { filterClick } from 'src/models/Filter/actions';
import { togglePostModal } from 'src/models/PostModal/actions';

// Our Dependencies
import styles from './index.scss';
import formatTimestamp from 'src/app/util/formatTimestamp';

const mapStateToProps = ({ post, comment }) => {
  return {
    post: post.post,
    isFetchingPost: post.isFetching,
    isFetching: post.isFetching,
    comments: comment.comments,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPost,
    fetchComments,
    saveComment,
    voteComment,
    deleteComment,
    votePost,
    deletePost,
    filterClick,
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
    } = this.props;

    const onDeleteComment = (id) => {
      this.props.deleteComment(id)
    }

    const onDeletePost = () => {
      this.props.deletePost(post.id)
      this.props.history.push('/')
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      const values = serializeFrom(e.target, { hash: true });
      this.props.saveComment(values);

      this.formRef.reset();
    }

    return (
      <div className="post-detail">
        {
          !isFetchingPost && (
            <div className="container">
              <div className="header">
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
                      <input name="author" type="text" placeholder="Author" required />
                    </fieldset>
                    <fieldset>
                      <textarea name="body" placeholder="Post a Comment!" required></textarea>
                    </fieldset>
                    <button className="button button--primary" type="submit">Post 🙌</button>
                  </form>
                </div>
        

                {/* All Comments */}
                <div className="comments">
                  <div>
                    { !!comments.length && <h3>Comments</h3> }
                    <ul>
                    {
                      !!comments.length && comments.map(comment => (
                        !comment.deleted && (
                          <ol key={comment.id}>
                            <p>{comment.body}</p>
                            <div className="meta">
                              <span className="author">by {comment.author}</span>
                              <span className="date">{formatTimestamp(comment.timestamp)}</span>
                              <div className="danger-buttons">
                                <div onClick={() => this.props.togglePostModal(isOpen, post)} className="edit-button"></div>
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
                  { !!comments.length  && (
                    <div className="filter-wrapper">
                      <Filter onFilterClick={this.props.filterPost} />
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