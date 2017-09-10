// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Our Components
import Home from 'src/screens/Home';
import Header from 'src/components/Header';
import PostDetail from 'src/screens/PostDetail';

// Our Actions
import { fetchPostsAndComments, filterPost, votePost, togglePostModal, savePost } from 'src/models/Post/actions';
import { fetchCategories } from 'src/screens/Home/components/Category/model/actions';

// Redux
const mapStateToProps = ({ post, home, router }) => ({
  posts: post.posts,
  postFilter: post.filter,
  isFetchingPosts: post.isFetching,
  categories: home.category.categories,
  isFetchingCategories: home.category.isFetching,
  pathname: router.location.pathname,
  isPostModalOpen: post.isPostModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(fetchPostsAndComments());
    dispatch(fetchCategories());
  },
  onFilterClick: (order, by) => dispatch(filterPost(order, by)),
  onClickVote: (id, option) => dispatch(votePost(id, option)),
  togglePostModal: (isOpen) => dispatch(togglePostModal(isOpen)),
  savePost: (values) => dispatch(savePost(values)),
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
      openAddPostModal, 
      togglePostModal,
      isPostModalOpen,
      savePost,
     } = this.props;

    return (
      <div>
          <div className="container">
            <Header 
              togglePostModal={togglePostModal}
              isPostModalOpen={isPostModalOpen}
              savePost={savePost}
              categories={categories}
            />
        </div>
        <Route exact path="/:category?" render={({ history }) => (
          <Home 
            posts={posts}
            isFetchingPosts={isFetchingPosts}
            categories={categories}
            isFetchingCategories={isFetchingCategories}
            onFilterClick={onFilterClick}
            onClickVote={onClickVote}
            pathname={pathname}
            postFilter={postFilter}
            togglePostModal={togglePostModal}
            isPostModalOpen={isPostModalOpen}
            savePost={savePost}
            onPostClick={(uri) => history.push(uri)}
          />
        )}/>
        <Route path='/:category/:postId' render={({ match }) => (
          <PostDetail 
            onClickVote={onClickVote}
            post={posts.find(post => post.id === match.params.postId)}
          />
        )}/>
      </div>
 
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);