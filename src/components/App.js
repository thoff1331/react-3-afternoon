import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
  console.log(results)
  this.setState({ posts: results.data });
});
  }

  updatePost( id, text ) {
   axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then(results => {
     this.setState({ posts: results.data});
   });
  
  }

  deletePost( id ) {
    console.log(id)
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      console.log(results)
      this.setState({ posts: results.data});
    })

  }
  
  createPost( text ) {
axios.post('https://practiceapi.devmountain.com/api/posts',  { text }).then(results => {
  this.setState({ posts: results.data});

})

  }

  render() {
    const { posts } = this.state;
    let displayPosts =  
      posts.map( post => {
          return <Post 
          id={post.id}
          key={ post.id } 
          text={ post.text }
          date={ post.date}
          updatePostFn={this.updatePost}
          deletePostFn={this.deletePost} />                      
        })
      

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
         {displayPosts}
        </section>
      </div>
    );
  }
}

export default App;
