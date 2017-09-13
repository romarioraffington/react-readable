// External Dependencies
import React from 'react';

// Our Components
import Post from './components/Post';

export default ({posts, isFetching, onClickVote, onPostClick }) => (
  <ul>
    { 
      !isFetching && ( 
        posts.map(post => (
          !post.deleted  && (
            <Post 
              key={post.id} 
              post={post} 
              onClickVote={onClickVote} 
              onPostClick={onPostClick}
            /> 
          )
        ))
      )
    }
  </ul>
)