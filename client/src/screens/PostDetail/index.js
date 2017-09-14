// External Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Our Components
import Filter from 'src/components/Filter';

// Our Actions
import { fetchPost, votePost, deletePost } from 'src/models/Post/actions'
import { filterClick } from 'src/models/Filter/actions';
import { togglePostModal } from 'src/models/PostModal/actions';

// Our Dependencies
import styles from './index.scss';
import formatTimestamp from 'src/app/util/formatTimestamp';

const mapStateToProps = ({ post }) => {
  return {
    post: post.post,
    isFetching: post.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPost,
    votePost,
    deletePost,
    filterClick,
    togglePostModal,
  }, dispatch)
}

class PostDetail extends Component {
  componentWillMount() {
    const { postId } = this.props.match.params;
    this.props.fetchPost(postId);
  }

  render() {
    const isOpen = true;
    const { post, isFetching, votePost } = this.props;

    const onDeletePost = () => {
      this.props.deletePost(post.id)
      this.props.history.push('/')
    }

    return (
      <div className="post-detail">
        {
          !isFetching && (
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
                  <form>
                    <fieldset>
                      <input type="text" placeholder="Author" required />
                    </fieldset>
                    <fieldset>
                      <textarea placeholder="Post a Comment!" required></textarea>
                    </fieldset>
                    <button className="button button--primary" type="submit">Post 🙌</button>
                  </form>
                </div>
        

                {/* All Comments */}
                <div className="comments">
                  <div>
                    <h3>Comments</h3>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className="meta">
                      <span className="author">by Shantel Stewart</span>
                      <span className="date">August 12, 2017</span>
                      <div className="danger-buttons">
                        <div onClick={() => this.props.togglePostModal(isOpen, post)} className="edit-button"></div>
                        <div onClick={onDeletePost} className="delete-button"></div>
                      </div>
                      <div className="likes-container">
                        <span className="likes-count">
                          {post.voteScore > 0 ? `+${post.voteScore}` : post.voteScore}
                        </span>
                        <div className="likes-buttons">
                          <span onClick={() => votePost(post.id, 'upVote')} className="up-vote"></span>
                          <span onClick={() => votePost(post.id, 'downVote')} className="down-vote"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="filter-wrapper">
                    <Filter onFilterClick={this.props.filterPost} />
                  </div>
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