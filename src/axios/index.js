/**
 *  怎么样封装promise    出错处理？？？
 */
import axios from "axios";
import { Modal } from "antd";
import Utils from "./../utils/utils";

export default class Axios {
     /**
     * @_this:指向当前order类
     * @url:请求地址
     * @params:参数
     * @true :是否是mock生成的数据
     */
   static requestList(_this,url,params,isMock){
        let data = {
           params:params,
           isMock:isMock
        }
        this.ajax({
           url:url,
           data:data
        }).then(data =>{
          if (data.code === 0 && data.result) {
            data.result.item_list.map((item, index) => {
              item.key = index;
              return item;
            });
            _this.setState({
              list: data.result.item_list,
              pagination: Utils.pagination(data, current => {
                _this.params.page = current;
                _this.request();
              })
            });
          }
        })
   }



  static ajax(options) {
    let loading;
    if(options.data && options.data.isShowLoading !== false)
    {
       loading = document.getElementById("ajaxLoading");
       loading.style.display = 'block';
    }
    let baseUrl ="";
    if(options.isMock){
       baseUrl =
      "https://easy-mock.com/mock/5b7291ba17ef106fc40446f1/antdbike";   //切换为mock虚拟数据
    }else{
      baseUrl =
      "https://easy-mock.com/mock/5b7291ba17ef106fc40446f1/antdbike";   //测试项目真是后台数据
    }
    
    return new Promise((resolve, rejects) => {
      axios({
        url: options.url,
        method: "get",
        baseURL: baseUrl,
        timeout: 5000,
        params: (options.data && options.data.params) || ""
        //如果跨域 还需要带header  cookie
      }).then(responese => {
        if(options.data && options.data.isShowLoading !== false)
        {
          loading = document.getElementById("ajaxLoading");
          loading.style.display = 'none';
        }
        //表示请求成功而已，数据不一定正确需要进一步判断
        if (responese.status === 200) {
          let res = responese.data;
          //业务逻辑代码返回0
          if (res.code === 0) {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.message
            });
          }
        } else {
          //报错了，拦截错误消息
          rejects(responese.data);
        }
      });
    });
  }
}
