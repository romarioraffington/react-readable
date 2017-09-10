// External Dependencies
import React, { Component } from 'react';

// Our Dependencies
import styles from './index.scss';
import formatTimestamp from 'src/app/util/formatTimestamp';

// Component
class PostDetail extends Component {
  render() {
    const {
      post,
      onClickVote,
      } = this.props;

    return (
      <div className="post-detail">
        {
          post && (
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
                    <span onClick={() => onClickVote(post.id, 'upVote')}  className="up-vote"></span>
                    <span onClick={() => onClickVote(post.id, 'downVote')} className="down-vote"></span>
                  </div>
                </div>
                <div className="mod-button">
                  <div onClick={() => onEditClick(post)} className="edit-button"></div>
                  <div className="delete-button"></div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default PostDetail;