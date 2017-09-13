// External Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux'
import parallel from 'async/parallel';

// Our Actions
import { fetchPostsAndComments, votePost } from 'src/models/Post/actions'
import { fetchCategories } from 'src/models/Category/actions'
import { filterPost } from 'src/models/Filter/actions';

// Our Components
import PostList from './components/PostList'
import Category from './components/Category';
import Filter from 'src/components/Filter';

// Other Dependencies
import filter from 'src/app/util/filter';

const mapStateToProps = ({ post, category, filter, router }) => ({
  posts: post.posts,
  isFetching: post.isFetching,
  categories: category.categories,
  filterType: filter.post,
  pathname: router.location.pathname,
})

const mapDispatchToProps = (dispatch, { onPostClick }) => (
  bindActionCreators({
    fetchPostsAndComments,
    fetchCategories,
    votePost,
    filterPost,
  }, dispatch)
)

class Home extends Component {
  componentWillMount() {
    parallel[
      this.props.fetchPostsAndComments(),
      this.props.fetchCategories()
    ]
  }

  filterPost(posts, pathname) {
    if (posts.length !== 0) {
      let clonedPost = posts.concat();

      // Filter by category
      if (pathname !== '/') {
        const path = pathname.concat().replace('/', '');
        
        clonedPost = posts.filter(p =>
          p.category.toLowerCase() === path
        )
      }

      // Apply the filter
      const { filterType } = this.props;
      return filter(clonedPost, filterType.order, filterType.by);

    } else {
      return []
    }
  }
  render() {
    const { isFetching, pathname, posts } = this.props;
    let filteredPosts = this.filterPost(posts, pathname);

    return (
      <div className="container">
        <div className="main-container">
          <div className="left-container">
            <Category 
              categories={this.props.categories}
              pathname={pathname} 
            />
          </div>
          <div className="middle-container">
            <PostList
              posts={filteredPosts}
              isFetching={isFetching}
              onClickVote={this.props.votePost}
              onPostClick={pathname => this.props.history.push(pathname)}
            />
          </div>
          <div className="right-container">
            <Filter onFilterClick={this.props.filterPost} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);