import React, { Component } from "react";
import { HashRouter, Route, Switch,Redirect } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Home from "./pages/home";
import Button from "./pages/ui/buttons";
import NoMatch from "./pages/ui/noMatch";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loading";
import Notification from "./pages/ui/notice";
import Messages from "./pages/ui/message";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousel from "./pages/ui/carousel";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";
import Basic from "./pages/table/basictable";
import High from "./pages/table/hightable";
import City from "./pages/city";
import Order from "./pages/order";
import Common from "./common";
import Detail from "./pages/order/detail";
import User from "./pages/user";
import Permission from "./pages/permission";


/**
 * 使用HashRouter来引流
 */

export default class IRouter extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/common"
            render={() => (
              <Common>
                <Route path="/common/order/detail/:orderId" exact component={Detail} />
              </Common>
            )}
          />
          <Route
            path="/"
            render={() => (
              <Admin>
                <Switch>
                <Route path="/home" component={Home} />
                  <Route path="/ui/buttons" component={Button} />
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loadings" component={Loadings} />
                  <Route
                    path="/ui/notification"
                    component={Notification}
                  />
                  <Route path="/ui/messages" component={Messages} />
                  <Route path="/ui/tabs" component={Tabs} />
                  <Route path="/ui/gallery" component={Gallery} />
                  <Route path="/ui/carousel" component={Carousel} />
                  <Route path="/form/login" component={FormLogin} />
                  <Route path="/form/reg" component={FormRegister} />
                  <Route path="/table/basic" component={Basic} />
                  <Route path="/table/high" component={High} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/user" component={User} />
                  <Route path="/permission" component={Permission} />
                  <Redirect to="/home" />
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            )}
          />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}
