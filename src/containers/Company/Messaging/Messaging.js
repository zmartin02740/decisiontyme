import React, { Component } from "react";
import TextAreaFieldGroup from "../../../common/Form/TextAreaFieldGroup";
import PostFeed from "./PostFeed";

class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      posts: [
        {
          id: 0,
          text: "how does this work",
          replies: [
            {
              id: 0,
              text: "this is how it works"
            },
            {
              id: 1,
              text: "Oh that makes sense"
            }
          ]
        },
        {
          id: 1,
          text: "can this software do this??",
          replies: [
            {
              id: 0,
              text: "not yet but we can start working on that now"
            }
          ]
        }
      ],
      keyId: 2
    };

    this.keyIdHandler = this.keyIdHandler.bind(this);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  keyIdHandler = () => {
    let keyId = this.state.keyId;
    keyId += 1;
    this.setState({ keyId });
    return keyId;
  };

  onSubmit = event => {
    event.preventDefault();
    const newPost = {
      id: this.keyIdHandler(),
      text: this.state.text,
      replies: []
    };

    this.setState(prevState => ({
      posts: [newPost].concat(prevState.posts)
    }));
  };

  render() {
    let postContent = <PostFeed posts={this.state.posts} />;
    return (
      <div>
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-header bg-muted text-black">Questions</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Have a question? Ask it here..."
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-light"
                  style={{ color: "purple" }}
                  type="submit"
                >
                  <i className="far fa-envelope text-success mr-1" />
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        {postContent}
      </div>
    );
  }
}

export default Messaging;
