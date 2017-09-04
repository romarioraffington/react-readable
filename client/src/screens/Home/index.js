// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Our Components
import PostList from 'src/components/PostList'
import Header from 'src/components/Header';
import Category from './components/Category';
import Filter from 'src/components/Filter';
import Post from 'src/components/Post';

// Our Actions
import { fetchPosts, filterPost } from 'src/components/Post/model/actions';
import { fetchCategories } from './components/Category/model/actions';

// Redux
const mapStateToProps = ({ post, home, router }) => ({
  posts: post.posts,
  isFetchingPosts: post.isFetching,
  categories: home.category.categories, 
  isFetchingCategories: home.category.isFetching, 
  pathname: router.location.pathname, 
})

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  },
  onFilterClick: (order, by) => dispatch(filterPost(order, by)),
})

// Component
class Home extends Component {
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

     // Filter Posts based on the pathname 
     // returned by react-router-redux
     let filteredPosts = posts;
     if (pathname !== '/') {
        filteredPosts = posts.filter(p => 
          p.category.toLowerCase() === pathname.replace('/','')
        )
     }

     const filterClick = (order, by) => {
      onFilterClick(order, by);
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
            <Filter onFilterClick={filterClick} />
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