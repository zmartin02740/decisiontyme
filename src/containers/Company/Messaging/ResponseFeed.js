import React, { Component } from "react";
import ResponseItem from "./ResponseItem";

class ResponseFeed extends Component {
  render() {
    const { post } = this.props;
    return post.replies.map(reply => <ResponseItem reply={reply} />);
  }
}

export default ResponseFeed;
