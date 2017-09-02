// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import parallel from 'async/parallel'; 

// Our Components
import PostList from 'src/components/PostList'
import Header from 'src/components/Header';
import Category from 'src/components/Category';
import Post from 'src/components/Post';
import Filter from 'src/components/Filter';

// Other Dependencies
import { fetchPosts } from 'src/models/Post/actions';
import { fetchCategories } from 'src/models/Category/actions';

// Redux
const mapStateToProps = ({ post, category, router }) => ({
  posts: post.posts,
  isFetchingPosts: post.isFetching,
  categories: category.categories, 
  isFetchingCategories: category.isFetching, 

  // Used to render the Home component
  // and it's children on route change
  // as the NavLink activeClassName is 
  // dependent on rerenders
  router: router, 
})

const mapDispatchToProps = (dispatch) => ({
  onLoad: () => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }
})

// Component
class Home extends Component {
  componentWillMount() {
    this.props.onLoad();
  }
  
  // Get all Posts when Home is rendered
  // Based on route change filter posts
  // Based on filter, filter post and pass through
  // Post is a dumb component and should just render a post
  // PostList is a dumb component that should just render a lists of posts

  // Questions
  //
  render() {
    const { 
      posts, 
      isFetchingPosts,
      categories,
      isFetchingCategories,
     } = this.props;
     
    return (
      <div className="container">
        <Header />
        <div className="main-container">
          <div className="left-container">
            <Category 
              categories={categories}
              isFetching={isFetchingCategories} />
          </div>
          <div className="middle-container">
            <PostList
              posts={posts}
              isFetching={isFetchingPosts}
            />
          </div>
          <div className="right-container">
            <Filter />
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