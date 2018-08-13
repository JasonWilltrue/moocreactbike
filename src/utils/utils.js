/**
 * @pagination 分页功能
 */
export default {
     pagination(data,callback){
       let page = {
           onChange:(current)=>{
               callback(current); //告诉他们我们要干嘛
           },
           current : data.result.page,  //读取请求分页的数据  当前页数
           pageSize:data.result.page_size,    //每页条数
           total:data.result.total_count,        //总条数
           showTotal:()=>{
                return `总共${data.result.total_count}条数据，当前第${data.result.page}页`
           },
           showQuickJumper:true,
       }
       return page;

     }
}