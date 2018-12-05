import React, { Fragment, Component } from "react";
import { Row } from "antd";
import Header from "./components/Header";

import "./style/common.less";

class Common extends Component {
  render() {
    return (
      <Fragment>
        <Row className="simple-page">
          <Header menuType="second" />
        </Row>
        <Row className="content">
            {this.props.children}
        </Row>

      </Fragment>
    );
  }
}
export default Common;
