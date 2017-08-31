// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Our Dependencies
import styles from './index.scss';
import formatTimestamp from 'src/util/formatTimestamp';
import { fetchPosts } from './model/actions';

// Redux
const mapStateToProps = ({ screen }) => {
  const { post } = screen.home;
  return {
    posts: post.posts,
    isFetching: post.isFetching,
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

class Post extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, isFetching } = this.props;
    
    return (
      <ul>
        {!isFetching &&  (
          posts.map(post => (
            !post.deleted && (
              <li key={post.id} className="post-container">
                <span className="date">{formatTimestamp(post.timestamp)}</span>
                <div className="card">
                  <div className="meta">
                    <div className="likes-container">
                      <span className="likes-count">
                        { post.voteScore > 0 ? `+${post.voteScore}`: post.voteScore }
                      </span>
                      <div className="likes-buttons">
                        <a className="up-vote"></a>
                        <a className="down-vote"></a>
                      </div>
                    </div>
                  </div>
                  <div className="card-content">
                    <h2>{post.title}</h2>
                    <div className="card-details">
                      <p className="description">{post.body}</p>
                      <span className="author">by {post.author}</span>
                    </div>
                  </div>
                </div>
              </li>
            )
          ))
        )}
      </ul>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);