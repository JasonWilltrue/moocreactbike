import React, { Component, Fragment } from "react";
import "./detail.less";
import axios from "./../../axios";

export default class Detail extends Component {
  state = {
    detailInfo: {}
  };

  componentDidMount() {
    //获取网页链接动态编号
    let orderId = this.props.match.params.orderId;
    console.log(this.props.match.params, orderId);

    if (orderId) {
      this.getDetailInfo(orderId);
    }
  }

  getDetailInfo = orderId => {
    axios
      .ajax({
        url: "/order/detail",
        data: {
          params: {
            orderId: orderId
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          console.log(res);
          this.setState({
            detailInfo: res.result
          });
        }
      });
  };

  render() {
    const info = this.state.detailInfo || {};
    return (
      <Fragment>
        <div id="orderDetailMap">地图显示区</div>
        <div className="detail-items">
          <div className="item-title">基础信息</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">用车模式</div>
              <div className="detail-form-content">
                {info.mode === 1 ? "服务区" : "停车点"}
              </div>
            </li>
            <li>
              <div className="detail-form-left">订单编号</div>
              <div className="detail-form-content">{info.order_sn}</div>
            </li>
            <li>
              <div className="detail-form-left">车辆编号</div>
              <div className="detail-form-content">{info.bike_sn}</div>
            </li>
            <li>
              <div className="detail-form-left">用户姓名</div>
              <div className="detail-form-content">{info.user_name}</div>
            </li>
            <li>
              <div className="detail-form-left">手机号码</div>
              <div className="detail-form-content">{info.mobile}</div>
            </li>
          </ul>
        </div>
        <div className="detail-items">
          <div className="item-title">行驶轨迹</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">行驶起点</div>
              <div className="detail-form-content">{info.start_location}</div>
            </li>
            <li>
              <div className="detail-form-left">行驶终点</div>
              <div className="detail-form-content">{info.end_location}</div>
            </li>
            <li>
              <div className="detail-form-left">行驶里程</div>
              <div className="detail-form-content">
                {info.distance / 1000 + "公里"}
              </div>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}
