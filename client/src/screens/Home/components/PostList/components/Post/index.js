// External Dependencies
import React from 'react';

// Our Dependencies
import styles from './index.scss';
import formatTimestamp from 'src/app/util/timestamp';

export default ({ post, onClickVote, onPostClick }) => (
  <li key={post.id} className="post-container">
    <div className="top-left-data">
    <span className="date">{timestamp(post.timestamp)}</span>
    <div className="comment">
      <span className="img">comment</span>
      <span className="comment-count">{post.comments ? post.comments.length: 0}</span>
    </div>
    </div>
    <div className="card">
      <div className="meta">
        <div className="likes-container">
          <span className="likes-count">
            {post.voteScore > 0 ? `+${post.voteScore}` : post.voteScore}
          </span>
          <div className="likes-buttons">
            <span onClick={() => onClickVote(post.id, 'upVote')} className="up-vote"></span>
            <span onClick={() => onClickVote(post.id, 'downVote')} className="down-vote"></span>
          </div>
        </div>
      </div>
      <div className="card-content" onClick={() => onPostClick(`${post.category}/${post.id}`, post)}>
        <h2>{post.title}</h2>
        <div className="card-details">
          <p className="description">
            { post.body.slice(0, 120) }
            { post.body.length > 120 ? '...' : ''}
          </p>
          <span className="author">by {post.author}</span>
        </div>
      </div>
    </div>
  </li>
)