import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Main extends Component{

     render(){
         return(
            <div>
                 this is main page主页
                 <Link to="/main/a">壳套路由</Link>
                 {this.props.children}
             </div>
         )
     }

}