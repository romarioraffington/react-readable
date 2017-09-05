// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Our Components
import Home from 'src/screens/Home';

// Our Actions
import { fetchPosts, filterPost, votePost } from 'src/components/Post/model/actions';
import { fetchCategories } from 'src/screens/Home/components/Category/model/actions';

// Redux
const mapStateToProps = ({ post, home, router }) => ({
  posts: post.posts,
  postFilter: post.filter,
  isFetchingPosts: post.isFetching,
  categories: home.category.categories,
  isFetchingCategories: home.category.isFetching,
  pathname: router.location.pathname,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  },
  onFilterClick: (order, by) => dispatch(filterPost(order, by)),
  onClickVote: (id, option) => dispatch(votePost(id, option)),
});

class App extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const {
      posts,
      isFetchingPosts,
      categories,
      isFetchingCategories,
      pathname,
      onFilterClick,
      onClickVote,
      postFilter,
     } = this.props;

    return (
      <Home 
        posts={posts}
        isFetchingPosts={isFetchingPosts}
        categories={categories}
        isFetchingCategories={isFetchingCategories}
        onFilterClick={onFilterClick}
        onClickVote={onClickVote}
        pathname={pathname}
        postFilter={postFilter}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);