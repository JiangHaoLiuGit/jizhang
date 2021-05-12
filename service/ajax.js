import config from './config.js'
import state from '../store/index.js'

// let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDQ1MjY4MDMsInVzZXJfbmFtZSI6Im9PYW9fNVhpWHN0WE05ZDFEMGZXdmVtb1hUQmciLCJqdGkiOiJhYjhmNWE5Yy0yZWQ5LTQ3MjgtYjAzNy1kNGJmYTRjZDlmOTMiLCJjbGllbnRfaWQiOiJndyIsInNjb3BlIjpbImFsbCJdfQ.Ci-VZ6tY6QqEWewCkg8g8WSmskPhfl8y7dlr5KBkepg"
const request = (url, options) => {
	 let token = {
		   access_token:state.state.access_token,
		   refresh_token:state.state.refresh_token
	 }
   let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
   }
   if(token.access_token != ""){
	   headers = {
	      'Content-Type': 'application/x-www-form-urlencoded',
	   	  'Authorization':'Bearer ' + token.access_token
	   }
   }
  
   if(url == config.login_url){
      headers = {
         'Content-Type': 'application/x-www-form-urlencoded'
      }
   }
   return new Promise((resolve, reject) => {
       uni.request({
           url: url,
           method: options.method,
           data: options.data,
           header: headers,
           success(request) {
			   resolve(request.data)
              if(request.statusCode == '401'){
				console.log("token.access_token")
				console.log(token.access_token)
				console.log("token过期了")
              }
              if(typeof request.data == "string"){
               if(request.data.substring(0,1) == "<"){
                     //检测到token过期
					 console.log("token.refresh_token")
                     console.log(token.refresh_token)
                     if(token.refresh_token == "" && url != config.login_url){
                        //跳往主页
                        uni.showToast({ title: "账号信息过期.正在跳往登录页", icon: "none",duration: 2000 });
                        setTimeout(function(){
                           uni.navigateTo({
                              url: "/pages/login/login",
                           });
                        },2000)
                     }
                     uni.showModal({
                        title: '提示',
                        content: '用户信息过期.请重新获取',
                        success (res) {
                           
                        if (res.confirm) {
                              uni.request({
                                 url: config.pathPrefix+"token/refresh",
                                 method: "POST",
                                 data: {"refreshToken":token.refresh_token},
                                 header:{
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                 },
                                 success(res) {
                                    console.log(res)
                                    if(res.data.code == "0"){
										console.log(token.access_token)
										state.commit("getAccessToken",res.data.data.access_token)
										state.commit("getRefreshToken",res.data.data.refresh_token)
										console.log("之后")
										console.log(state.state.access_token)
										
                                    }else{
                                       //跳往主页
                                       uni.showToast({ title: "账号信息过期.正在跳往登录页", icon: "none",duration: 2000 });
                                       setTimeout(function(){
                                          uni.navigateTo({
                                             url: "/pages/login/login",
                                          });
                                       },2000)
                                    }
                                 },
                                 fail(error) {
                                    //失败结果
                                    console.log(error)
                                    //401 如果不成功跳登录页
                                    reject(error)
                                 }
                              })
                        } else if (res.cancel) {}
                        }
                     })
                  }
                  
               }else{
                  resolve(request.data)
               }
               
           },
           fail(error) {
               //失败结果
               console.log(error)
               //401 如果不成功跳登录页
               reject(error)
           }
       })
   })
}


const get = (url, options = {}) => {
   return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
   return request(url, { method: 'POST', data: options })
}


module.exports = {
   get,
   post,
}