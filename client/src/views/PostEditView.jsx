import React, { Component } from "react";
import { loadPost, editPost } from "./../services/post";

class PostEditView extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    loadPost(this.props.match.params.id)
      .then((post) => {
        tjos.setState({
          loaded: true,
          content: post.content,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePostEditing = (event) => {
    event.preventDefault();

    const content = this.state.content;
    const id = this.props.match.params.id;
    const body = { content };

    editPost(id, body);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handlePostEditing}>
          <label htmlFor="content-input">Post Content</label>
          <textarea
            id="content-input"
            placeholder="Write your post here..."
            name="content"
            value={this.state.content}
            onChange={this.handleInputChange}
          />
          <button>Edit Post</button>
        </form>
      </div>
    );
  }
}

export default PostEditView;
