// External Dependencies
import React from 'react';

// Our Components
import Header from 'src/components/Header';
import Category from './components/Category';
import Post from 'src/components/Post';
import Filter from 'src/components/Filter';

export default () => (
  <div className="container">
    <Header />
    <div className="main-container">
      <div className="left-container">
        <Category />
      </div>
      <div className="middle-container">
        <Post />
      </div>
      <div className="right-container">
        <Filter />
      </div>
    </div>
  </div>   
)