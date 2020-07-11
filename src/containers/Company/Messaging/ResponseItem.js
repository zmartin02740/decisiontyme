import React, { Component } from "react";

class ResponseItem extends Component {
  render() {
    const { reply } = this.props;
    return (
      <div key={reply.id}>
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-6">{reply.text}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResponseItem;
