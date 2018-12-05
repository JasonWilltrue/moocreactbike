import React, { Component } from "react";
import { HashRouter, Route,Switch} from 'react-router-dom';
import Main from '../route1/main';
import About from '../route1/about';
import Topic from '../route1/topic';
import Err from '../route1/err';
import Home from '../route2/home';

export default class IRoute extends Component {
    render() {
        return (
            <HashRouter>
                <Home>
                    <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topic} />
                    <Route path="/:id" component={Err} />
                    </Switch>
                </Home>
            </HashRouter>
        )
    }

}