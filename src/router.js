import React, { Component } from 'react';
import { HashRouter, Route,Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Button from './pages/ui/buttons';
import NoMatch from './pages/ui/noMatch';



export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <App>
                        <Route path="/login" component={Login} />
                        <Route path="/admin" render={() =>
                            <Admin>
                                <Switch>
                                <Route path="/admin/ui/buttons" component={Button} />
                                <Route  component={NoMatch} />
                                </Switch>
                            </Admin>
                        }/>
                    </App>
                </div>
            </HashRouter>
        )
    }

}