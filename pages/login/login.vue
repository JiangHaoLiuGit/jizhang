<template>
	<view>
		<image class="loginImg" src="../../static/pic01.png"></image>
		<form class="por" @submit="formSubmit">
			<view class="loginForm">
				<view class="img poa content"><image src="../../static/pic04.png"></image></view>
				<view class="inputView first">
					<image src="../../static/pic02.png"></image>
					<input type="text" name="userName" v-model="username" placeholder="请输入用户名">
				</view>
				<view class="inputView">
					<image src="../../static/pic03.png"></image>
					<input type="password" name="passWord" v-model="password" placeholder="请输入密码">
				</view>
			</view>
			<text class="info">
				无法正常登录，请联系管理员
			</text>
			<button type="primary" form-type="submit" class="login-button">登录</button>
		</form>
	</view>
</template>

<script>
	import config from '../../service/config.js'
	import ajax from '../../service/ajax.js'
	var  graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				title: 'Hello',
				username:"",
				password:"",
				// 13333333333 超级管理员（啥都能干）				// 15599663366 操作员（管理员界面进不去）				// 15599663388 充值加油员（只能充值加油）				// 统一密码：888888
			}
		},
		onLoad() {
			 
		},
		methods: {
			formSubmit(e){
				//定义表单规则
				var rule = [
				    {name:"userName", checkType : "string", checkRule:"1,13",  errorMsg:"账号应为1-13个字符"},
					{name:"passWord", checkType : "string", checkRule:"1,10",  errorMsg:"密码应为1-10个字符"},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					uni.showLoading({
						title:"登陆中"
					})
					ajax.post(config.login_url,{
					  username: this.username,
					  password: this.password,
					}).then(res => {
					  console.log(res)
					  if(res.code == 0){
						  this.$store.commit("getAccessToken",res.data.access_token)
						  this.$store.commit("getRefreshToken",res.data.refresh_token)
						  
							// ajax.post(config.getUserInfo_url,{
							// }).then(res => {
							// 	console.log("...")
							// 	console.log(res)
							// 	if(res.code == 0){
									
							// 	}
							// }).catch(err => {
							//   //ajax.js反馈的reject结果
							//   console.log(err)
							// })
							let that = this
							uni.request({
							  url: config.getUserInfo_url,
							  method: "post",
							  header: {
							   'Content-Type': 'application/x-www-form-urlencoded', // 默认值
							   'Authorization':'Bearer '+res.data.access_token
							  },
							  success(res) {
								  console.log("...")
							      console.log(res)
								  if(res.data.code == 0){
									  if(res.data.data.userRole == "adminFuelFuel"){
										  that.$store.commit("getRoles",1)
									  }else if(res.data.data.userRole == "operationFuel"){
										  that.$store.commit("getRoles",2)
									  }else if(res.data.data.userRole == "seeFuel"){
										  that.$store.commit("getRoles",3)
									  }
									  uni.hideLoading()
									  uni.navigateTo({
									  	url: "/pages/index/index",
									  });
								  }
							  },
							  fail(error) {
							      //失败结果
							      console.log(error)
							  }
							})
						  //角色权限分配3.加油充值员
						  // if(this.username == "13333333333"){
							 //  this.$store.commit("getRoles",1)
						  // }else if(this.username == "15599663366"){
							 //  this.$store.commit("getRoles",2)
						  // }else if(this.username == "15599663388"){
							 //  this.$store.commit("getRoles",3)
						  // }
						  // uni.navigateTo({
						  // 	url: "/pages/index/index",
						  // });
						  // this.$store.commit("getRoles",3)
						  // uni.navigateTo({
						  // 	url: "/pages/index/index",
						  // });
					  }else{
						  uni.showToast({ title: "账号或密码错误请重新输入",icon: "none" ,duration:2000});
					  }
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}else{
					uni.showToast({ title: graceChecker.error,icon: "none",duration:2000 });
				}
			}
		}
	}
</script>

<style>
	*{
		padding:0;
		margin: 0;
		box-sizing:border-box;
	}
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.por{
		position: relative;
	}
	.poa{
		position: absolute;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.loginImg{
		width: 750upx;
		height: 400rpx;
		z-index: 1;
	}
	form{
		display: block;
		margin-left: 72upx;
		position: relative;
		bottom: 80upx;
		z-index: 2;
		width: 608upx;
	}
	.loginForm{
		width: 608upx;
		height: 482upx;
		border-radius: 20upx;
		border: 2upx solid #E3E3E3;
		padding: 140upx 44upx 50upx 44upx;
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
		background: #fff;
	}
	.loginForm .img{
		width: 160upx;
		height: 160upx;
		border: 8upx solid #FD8C25;
		background: #FFFFFF;
		border-radius: 80upx;
		left: 224upx;
		top: -90upx;
		
	}
	.loginForm .img image{
		width: 80upx;
		height: 80upx;
	}
	.loginForm .inputView{
		border-radius: 8upx;
		border: 2upx solid #E3E3E3;
		width: 100%;
		height: 100upx;
		padding: 26upx 24upx 0 24upx;
		display: flex;
		justify-content: space-between;
	}
	.loginForm .inputView.first{
		margin-bottom: 64upx;
	}
	.loginForm .inputView image{
		width: 50upx;
		height: 50upx;
	}
	.loginForm .inputView input{
		width: auto;		height: 50upx;
		border:none;
		border-left: 2upx solid #E3E3E3;
		padding-left: 32upx;
	}
	.info{
		color: #0089FF;
		font-size: 24upx;
		line-height: 32upx;
		display: block;
		width: 100%;
		height: 40upx;
		margin-bottom: 84upx;
		margin-top: 34upx;
		text-align: center;
	}
	form button{
		background: #FD8C25;
		width: 500upx;
		height: 100upx;
		margin: 0 auto;
		font-size: 40upx;
	}
	.login-button{
		background-color: #FD8C25;
	}

</style>
