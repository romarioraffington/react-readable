// External Dependencies
import React, { Component } from 'react';

// Our Dependencies
import styles from './index.scss';

class Post extends Component {
  render() {
    return (
      <div>
        <div className="post-container">
          <span className="date">August 12, 2017</span>
          <div className="card">
            <div className="meta">
              <div className="comment-container">
                <span className="comments-count">10</span>
              </div>
              <div className="likes-container">
                <span className="likes-count">+20</span>
                <div className="likes-buttons">
                  <a className="up-vote"></a>
                  <a className="down-vote"></a>
                </div>
              </div>
            </div>
            <div className="card-content">
              <h2>Learning Redux in 10 Minutes!</h2>
              <div className="card-details">
                <p className="description">Just kidding. It takes more than 10 minutes to learn technology. Lorem..</p>
                <span className="author">by Jase West</span>
              </div>
            </div>
          </div>
        </div>

        <div className="post-container">
          <span className="date">August 12, 2017</span>
          <div className="card">
            <div className="meta">
              <div className="comment-container">
                <span className="comments-count">10</span>
              </div>
              <div className="likes-container">
                <span className="likes-count">+20</span>
                <div className="likes-buttons">
                  <a className="up-vote"></a>
                  <a className="down-vote"></a>
                </div>
              </div>
            </div>
            <div className="card-content">
              <h2>Learning Redux in 10 Minutes!</h2>
              <div className="card-details">
                <p className="description">Just kidding. It takes more than 10 minutes to learn technology. Lorem..</p>
                <span className="author">by Jase West</span>
              </div>
            </div>
          </div>
        </div>

        <div className="post-container">
          <span className="date">August 12, 2017</span>
          <div className="card">
            <div className="meta">
              <div className="comment-container">
                <span className="comments-count">10</span>
              </div>
              <div className="likes-container">
                <span className="likes-count">+20</span>
                <div className="likes-buttons">
                  <a className="up-vote"></a>
                  <a className="down-vote"></a>
                </div>
              </div>
            </div>
            <div className="card-content">
              <h2>Learning Redux in 10 Minutes!</h2>
              <div className="card-details">
                <p className="description">Just kidding. It takes more than 10 minutes to learn technology. Lorem..</p>
                <span className="author">by Jase West</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Post;