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

  renderMap = (res) => {
    // ☆☆☆单独BMap 是会undefined的 因为是单页面应用只能根据import导入查找到对象，所有要找挂载到window下的BMap☆☆☆
    this.map = new window.BMap.Map("orderDetailMap", { enableMapClick: false });
    this.map.centerAndZoom('北京', 11);
    this.addMapControl();
    this.drawBikeRoute(res.position_list);

  };
  //添加地图控件
  addMapControl = () => {
    let map = this.map;
    map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}));
    map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}));
  };
  // 绘制行驶路线图
  drawBikeRoute = (positionList)=>{
    let map = this.map;
    let startPoint = '';
    let endPoint = '';
    if(positionList.length>0)
    {

       let arr = positionList[0];
       startPoint = new window.BMap.Point(arr.lon,arr.lat);
       var startIcon = new window.BMap.Icon("./assets/start_point.png", new window.BMap.Size(36,42), {
        // 指定定位位置。
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
        // 图标中央下端的尖角位置。
        imageSize:new window.BMap.Size(36,42),

        anchor:new window.BMap.Size(36,42)
        });
      let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon});
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
          this.renderMap(res.result);
        }
      });
  };

  render() {
    const info = this.state.detailInfo || {};
    return (
      <div className="detail-Wapper">
        <div id="orderDetailMap" className="order-map"></div>
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
      </div>
    );
  }
}
