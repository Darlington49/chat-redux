import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
// function ChatPage() {
class ChatPage extends Component {
  state = { chatMessage: "" };

  componentDidMount() {
    let server = "localhost:5000";
    this.socket = io(server, { transports: ["websocket"] });
  }

  handleSearchChange = (e) => {
    this.setState({ chatMessage: e.target.value });
    console.log(e.target.value);
  };

  submitChatMessage = (e) => {
    e.preventDefault();
    // this.setState({ chatMessage: e.target.value });
    let chatMessage = this.state.chatMessage;
    let userName = this.props.user.userData.name;
    console.log(this.props);

    this.socket.emit("Input Chat Message", { chatMessage, userName });
    this.setState({ chatMessage: "" });
  };
  render() {
    return (
      <React.Fragment>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="infinite-container">
            {/* <div
            ref={(el) => {
              this.messageEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div> */}
          </div>

          <Row>
            <form layout="inline" onSubmit={this.submitChatMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  type="text"
                  placeholder="Let's Talk"
                  prefix={
                    <Icon type="message" style={{ color: "rgba(0,0,0,.25" }} />
                  }
                  value={this.state.chatMessage}
                  onChange={this.handleSearchChange}
                ></Input>
              </Col>
              <Col></Col>
              <Col span={2}></Col>
              <Col span={4}>
                <button
                  type="primary"
                  style={{ width: "100%" }}
                  htmlType="submit"
                >
                  <Icon type="enter" />
                </button>
              </Col>
            </form>
          </Row>
        </div>
        ChatPage
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(ChatPage);
