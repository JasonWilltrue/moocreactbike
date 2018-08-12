/**
 *  怎么样封装promise    出错处理？？？
 */
import axios from "axios";
import { Modal } from "antd";
export default class Axios {
  static ajax(options) {
    let loading;
    if(options.data && options.data.isShowLoading !== false)
    {
       loading = document.getElementById("ajaxLoading");
       loading.style.display = 'block';
    }
    let baseUrl =
      "https://www.easy-mock.com/mock/59b09f37e0dc6633419fb9eb/antdbike";
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
