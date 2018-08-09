import React, { Component } from "react";
import { Card, Tabs, message, Icon } from "antd";
import "./ui.less";

const TabPane = Tabs.TabPane;

export default class Tab extends Component {
  newTabIndex = 0;
  state = {
    panes: [],
    activeKey: "1",
  };
  componentDidMount() {
    const panes = [
      {
        title: "Tab 1",
        content: "内容1",
        key: "1"
      },
      {
        title: "Tab 2",
        content: "内容2",
        key: "2"
      },
      {
        title: "Tab 3",
        content: "内容3",
        key: "3"
      }
    ];

    this.setState({
      panes
    });
  }

  handleCallback = key => {
    console.log(key);
    message.info("成功了" + key + "标签");
  };
  onChange = activeKey => {
    console.log("当前激活第" + activeKey);
    this.setState({
      activeKey
    });
  };
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  /**
   * @newTabIndex 索引增加新标签
   */
  add = () => {
    const panes = this.state.panes;
    const activeKey = `NewTab ${this.newTabIndex++}`;
    panes.push({
      title: activeKey,
      content: "Content of "+activeKey,
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
      //获取当前打开的标签
    let activeKey = this.state.activeKey;
    // 声明一个索引
    let lastIndex;
    // 去判断当前打开的和删除的是不是同一个
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    // 判断十分最后一个  删除的和点击的是否同一个
    if (lastIndex >= 0 && activeKey === targetKey) {
    // 更新删除后激活的是哪一个
      activeKey = panes[lastIndex].key;
    }

    this.setState({ panes, activeKey });
  };
  render() {
    return [
      <Card title="Tab标签" className="card-warp">
        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
          <TabPane tab="Tab 1" key="1">
            Component1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Component2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Component3
          </TabPane>
        </Tabs>
      </Card>,
      <Card title="Tab标签带图标" className="card-warp">
        <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
          <TabPane
            tab={
              <span>
                <Icon type="apple" />
                Tab 1
              </span>
            }
            key="1"
          >
            Component1
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="android" />
                Tab 2
              </span>
            }
            key="2"
          >
            Component2
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="windows" />
                Tab 3
              </span>
            }
            key="3"
          >
            Component3
          </TabPane>
        </Tabs>
      </Card>,
      <Card title="动态添加Tab标签带图标" className="card-warp">
        <Tabs
          defaultActiveKey="1"
          onChange={this.onChange}
          onEdit={this.onEdit}
          activeKey={this.state.activeKey}
          type="editable-card"
        >
          {this.state.panes.map(item => {
            return (
              <TabPane
                tab={
                  <span>
                    <Icon type="apple" />
                    {item.title}
                  </span>
                }
                key={item.key}
              >
                {item.content}
              </TabPane>
            );
          })}
        </Tabs>
      </Card>
    ];
  }
}
