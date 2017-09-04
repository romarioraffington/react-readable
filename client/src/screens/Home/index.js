// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Our Components
import PostList from 'src/components/PostList'
import Header from 'src/components/Header';
import Category from './components/Category';
import Filter from 'src/components/Filter';
import Post from 'src/components/Post';

// Component
class Home extends Component {
  render() {

    const {
      posts,
      isFetchingPosts,
      categories,
      isFetchingCategories,
      pathname,
      onFilterClick,
      } = this.props;

    // Filter Posts based on the pathname 
    let filteredPosts = posts;
    if (pathname !== '/') {
      filteredPosts = posts.filter(p =>
        p.category.toLowerCase() === pathname.replace('/', '')
      )
    }

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