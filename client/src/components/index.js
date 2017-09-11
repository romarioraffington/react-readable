// External Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Our Components
import Home from 'src/screens/Home';
import PostModal from 'src/components/PostModal';
import Header from 'src/components/Header';
import PostDetail from 'src/screens/PostDetail';

// Our Actions
import { 
  fetchPostsAndComments, 
  filterPost, 
  votePost, 
  togglePostModal, 
  savePost,
  updatePost,
  deletePost
 } from 'src/models/Post/actions';
import { fetchCategories } from 'src/screens/Home/components/Category/model/actions';

// Redux
const mapStateToProps = ({ post, home, router }) => ({
  posts: post.posts,
  postFilter: post.filter,
  isFetchingPosts: post.isFetching,
  categories: home.category.categories,
  isFetchingCategories: home.category.isFetching,
  pathname: router.location.pathname,
  isPostModalOpen: post.modal.isPostModalOpen,
  isBeingEdited: post.modal.isBeingEdited,
  editingPost: post.modal.post,
});

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(fetchPostsAndComments());
    dispatch(fetchCategories());
  },
  onFilterClick: (order, by) => dispatch(filterPost(order, by)),
  onClickVote: (id, option) => dispatch(votePost(id, option)),
  togglePostModal: (isOpen, isBeingEdited, post) => dispatch(togglePostModal(isOpen, isBeingEdited, post)),
  savePost: (values) => dispatch(savePost(values)),
  updatePost: (id, values) => dispatch(updatePost(id, values)),
  onDeletePost: (id) => dispatch(deletePost(id)),
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
      isBeingEdited,
      savePost,
      updatePost,
      onDeletePost,
      editingPost,
     } = this.props;

    return (
      <div>
          <div className="container">
            <Header togglePostModal={togglePostModal}/>

            <PostModal 
              isAddPostModalOpen={isPostModalOpen}
              togglePostModal={togglePostModal}
              isBeingEdited={isBeingEdited}
              savePost={savePost}
              updatePost={updatePost}
              categories={categories}
              post={editingPost}
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
            savePost={savePost}
            onPostClick={(uri) => history.push(uri)}
          />
        )}/>
        <Route path='/:category/:postId' render={({ history, match }) => (
          <PostDetail 
            onClickVote={onClickVote}
            onDeletePost={(id) => {
              onDeletePost(id)
              history.push('/')
            }}
            togglePostModal={togglePostModal}
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