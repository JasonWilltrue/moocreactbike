import React, { Component } from "react";
import {  Route } from 'react-router-dom';
import Main from './main';
import About from '../route1/about';
import Topic from '../route1/topic';
import Err from '../route1/err';
import Home from './home';

export default class IRoute extends Component {
  render() {
    return (
      <Route>
        <Home>
            <Route path="/main" render={() =>
              <Main>
                <Route path="/main/a" component={About}></Route>
              </Main>
            } />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topic} />
            <Route path="/:id" component={Err} />
        </Home>
      </Route>
    )
  }

}