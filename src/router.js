import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./admin";
import Button from "./pages/ui/buttons";
import NoMatch from "./pages/ui/noMatch";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loading";
import Notification from "./pages/ui/notice";
import Messages from "./pages/ui/message";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousel from "./pages/ui/carousel";

export default class IRouter extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route
            path="/admin"
            render={() => (
              <Admin>
                <Switch>
                  <Route path="/admin/ui/buttons" component={Button} />
                  <Route path="/admin/ui/modals" component={Modals} />
                  <Route path="/admin/ui/loadings" component={Loadings} />
                  <Route path="/admin/ui/notification" component={Notification} />
                  <Route path="/admin/ui/messages" component={Messages} />
                  <Route path="/admin/ui/tabs" component={Tabs} />
                  <Route path="/admin/ui/gallery" component={Gallery} />
                  <Route path="/admin/ui/carousel" component={Carousel} />
                  <Route component={NoMatch} />

                </Switch>
              </Admin>
            )}
          />
        </App>
      </HashRouter>
    );
  }
}
