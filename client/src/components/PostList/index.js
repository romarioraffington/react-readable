// External Dependencies
import React from 'react';

// Our Components
import Post from '../Post';

export default ({ posts, isFetching }) => (
  <ul>
    { 
      !isFetching && ( 
        posts.map(post => (
          !post.deleted  && (
            <Post key={post.id} post={post} /> 
          )
        ))
      )
    }
  </ul>
)