// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Our Components
import PostList from 'src/components/PostList'
import Header from 'src/components/Header';
import Category from './components/Category';
import Filter from 'src/components/Filter';
import Post from 'src/components/Post';

// Other Dependencies
import filter from 'src/app/util/filter';

// Component
class Home extends Component {
  render() {

    const {
      posts,
      isFetchingPosts,
      categories,
      isFetchingCategories,
      onFilterClick,
      onClickVote,
      pathname,
      postFilter,
      } = this.props;

    // Filter Posts based on the
    // category selected
    let filteredPosts = posts.concat();
    if (pathname !== '/') {
      filteredPosts = posts.filter(p =>
        p.category.toLowerCase() === pathname.replace('/', '')
      )
    }

    // Apply the voteScore / timestamp  filter
    // Before rendering component
    filteredPosts = filter(filteredPosts, postFilter.order, postFilter.by);

    return (
      <div className="container">
        <Header />
        <div className="main-container">
          <div className="left-container">
            <Category
              categories={categories}
              isFetching={isFetchingCategories}
            />
          </div>
          <div className="middle-container">
            <PostList
              posts={filteredPosts}
              isFetching={isFetchingPosts}
              onClickVote={onClickVote}
            />
          </div>
          <div className="right-container">
            <Filter onFilterClick={onFilterClick} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home;