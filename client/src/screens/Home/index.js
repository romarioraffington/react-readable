// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Our Components
import PostList from 'src/components/PostList'
import Header from 'src/components/Header';
import Category from './components/Category';
import Filter from './components/Filter';
import Post from 'src/components/Post';

// Other Dependencies
import { fetchPosts } from 'src/models/Post/actions';
import { fetchCategories } from './components/Category/model/actions';

// Redux
const mapStateToProps = ({ post, home, router }) => ({
  posts: post.posts,
  isFetchingPosts: post.isFetching,
  categories: home.category.categories, 
  isFetchingCategories: home.category.isFetching, 

  // Used to render the Home component
  // and it's children on route change
  // as the NavLink activeClassName is 
  // dependent on rerenders
  pathname: router.location.pathname, 
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
  
  render() {
    const { 
      posts, 
      isFetchingPosts,
      categories,
      isFetchingCategories,
      pathname,
     } = this.props;

     // Filter Posts based on the 
     // pathname returned by react-router-redux
     let filteredPosts = posts;
     if (pathname !== '/') {
        filteredPosts = posts.filter(p => 
          p.category.toLowerCase() === pathname.replace('/','')
        )
     }

    // Sort Post ordered by voteScore 
    // (highest score first)    
     filteredPosts = filteredPosts.sort((a, b) => (
       b.voteScore - a.voteScore
    ));

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