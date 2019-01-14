import React, { Component } from 'react';
export default class Login extends Component {

    render() {
        return (
            <div>
                <div>ELM后台</div>
                <div>Bike后台</div>
                <div>其他后台</div>
                <div className="loginlayout">
                    <div>
                        <span>用户名：</span>
                        <input type="text" placeholder="输入账号" />
                    </div>
                    <div>
                        <span>密码：</span>
                        <input type="password" placeholder="输入密码" />
                    </div>
                    <div>登录</div>
                </div>
            </div>
        )
    }

}