// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Our Components
import Home from 'src/screens/Home';

// Our Actions
import { fetchPosts, filterPost } from 'src/components/Post/model/actions';
import { fetchCategories } from 'src/screens/Home/components/Category/model/actions';

// Redux
const mapStateToProps = ({ post, home, router }) => ({
  posts: post.posts,
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
      onFilterClick
     } = this.props;

     const filterClick = (order, by) => {
      onFilterClick(order, by);
    }

    return (
      <Home 
        posts={posts}
        isFetchingPosts={isFetchingPosts}
        categories={categories}
        isFetchingCategories={isFetchingCategories}
        onFilterClick={onFilterClick}
        pathname={pathname}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);