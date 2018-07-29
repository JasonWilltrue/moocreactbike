import React, {Component } from "react";
import {HashRouter,Route,Link} from 'react-router-dom';
import Main from './main';
import About from './about';
import Topic from './topic';

export default class Home extends Component{
     render(){
         <HashRouter>
            <div>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/topics">Topics</Link>
                </li>
                <li>
                <Link to="/main">Main</Link>
                </li>
            </ul>

         <hr />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topic} />
      <Route path="/main" component={Main} />

      </Switch>
    </div>
         </HashRouter>
     }

}