import React, { Component } from "react";
import ResponseFeed from "./ResponseFeed";
import TextAreaFieldGroup from "../../../common/Form/TextAreaFieldGroup";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResponses: false,
      keyId: 2,
      text: ""
    };
    this.showResponseClick = this.showResponseClick.bind(this);
  }

  keyIdHandler = () => {
    let keyId = this.state.keyId;
    keyId += 1;
    this.setState({ keyId });
    return keyId;
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const newReply = {
      id: this.keyIdHandler(),
      text: this.state.text
    };

    console.log(this.props.post.replies);

    this.setState(prevState => ({
      posts: [newReply].concat(prevState.post.replies)
    }));
  };

  showResponseClick = event => {
    event.preventDefault();
    this.setState({ showResponses: !this.state.showResponses });
  };

  render() {
    const { post } = this.props;

    let showResonseBtn = this.state.showResponses ? (
      <button className="btn btn-secondary" onClick={this.showResponseClick}>
        Hide Your {post.replies.length} Response(s)
      </button>
    ) : (
      <button className="btn btn-success" onClick={this.showResponseClick}>
        Show Your {post.replies.length} Response(s)
      </button>
    );

    let responseContent = null;

    if (this.state.showResponses) {
      responseContent = (
        <div style={{ borderLeft: "solid purple 2px" }}>
          <div className="col-md-12">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Have a follow up question? Ask it here..."
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
            Responses
            <ResponseFeed post={post} />
          </div>
        </div>
      );
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">| SENT | </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text} </p>
            {post.replies.length < 1 ? null : <span>{showResonseBtn}</span>}
            {responseContent}
          </div>
        </div>
      </div>
    );
  }
}

export default PostItem;
