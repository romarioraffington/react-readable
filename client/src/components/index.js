// External Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Our Components
import Header from 'src/components/Header';
import PostModal from 'src/components/PostModal';

// Our Screens
import Home from 'src/screens/Home';
import PostDetail from 'src/screens/PostDetail';

// Our Actions
import { togglePostModal } from 'src/models/PostModal/actions';

const mapStateToProps = ({ router }) => ({
  router: router.location.pathname,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    togglePostModal,
  }, dispatch)
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header togglePostModal={this.props.togglePostModal} />
        <Route exact path="/:category?" component={Home}/>
        <Route path='/:category/:postId' component={PostDetail} />
        <PostModal/>
    </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);