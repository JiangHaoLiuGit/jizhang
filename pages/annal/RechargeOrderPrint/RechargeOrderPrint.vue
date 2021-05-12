<template>
	<view class="viewView">
		<header-nav :isBack="true" title="打印详情" :center="true" :fontColor="{'color': '#333'}" :bgColor="{'background-color': '#F4F4F4'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic17.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<view class="printBackground borderRadius">
			充值成功,打印中...
		</view>
		<view class="print">
			<view>
				<view class="views">
					<view>类型</view>
					<view>企业充值</view>
				</view>
				<view class="views">
					<view>企业名称</view>
					<view>{{enterpriseName}}</view>
				</view>
				<view class="views">
					<view>充值金额</view>
					<view>{{amount}}元</view>
				</view>
				<s></s>
				<view class="views">
					<view>交易单号</view>
					<view>{{number}}</view>
				</view>
				<view class="views">
					<view>交易时间</view>
					<view>{{updateDate}}</view>
				</view>
				<view class="views">
					<view>操作员</view>
					<view>{{preferentialGradeName}}</view>
				</view>
			</view>
		</view>
		<button class="submitBtnGray absoluteBtn" @tap="go">打印成功并返回首页</button>
	</view>
</template>

<script>
	import config from '../../../service/config.js'
	import ajax from '../../../service/ajax.js'
	import headerNav from '../../../components/headerNav/headerNav.vue'
	export default{
		data(){
			return {
				rechargeId:0,
				preferentialGradeName:"",
				enterpriseName:"",
				afterAmount:0,//现余额
				beforeAmount:0,//原余额
				amount:0,//充值金额
				number:0,//订单编号
				updateDate:"",
			}
		},
		components:{
			headerNav
		},
		onLoad(option){
			console.log(option)
			if(option.rechargeId){
				this.rechargeId = option.rechargeId
			}
		},
		
		onShow(){
			if(this.rechargeId){
				ajax.get(config.selectById_url,{
				  id:this.rechargeId
				}).then(res => {
				  console.log(res)
				  if(res.code == 0){
					  if(res.data.afterAmount != 0){
						  this.afterAmount = res.data.afterAmount/100
					  }
					  if(res.data.amount != 0){
						  this.amount = res.data.amount/100
					  }
					  if(res.data.beforeAmount != 0){
						  this.beforeAmount = res.data.beforeAmount/100
					  }
					  if(res.data.enterpriseName != null){
						  this.enterpriseName = res.data.enterpriseName
					  }
					  if(res.data.stationName != null){
						  this.stationName = res.data.stationName
					  }
					  if(res.data.createName != null){
						  this.preferentialGradeName = res.data.createName
					  }
					  if(res.data.number != ""){
						  this.number = res.data.number
					  }
					  if(res.data.updateDate != ""){
						  let value = res.data.updateDate
						  let date = new Date(value);
						  let y = date.getFullYear();
						  let MM = date.getMonth() + 1;
						  MM = MM < 10 ? ('0' + MM) : MM;
						  let d = date.getDate();
						  d = d < 10 ? ('0' + d) : d;
						  let h = date.getHours();
						  h = h < 10 ? ('0' + h) : h;
						  let m = date.getMinutes();
						  m = m < 10 ? ('0' + m) : m;
						  let s = date.getSeconds();
						  s = s < 10 ? ('0' + s) : s;
						  this.updateDate =  y + '/' + MM + '/' + d + ' ' + h + ":" + m + ":" + s;
					  }
					  
				  }else{
					  uni.showToast({ title: "服务器错误!",icon: "none" ,duration:2000});
				  }
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})	
			}
		},
		methods:{
			goBack() {
			    uni.navigateBack()
			},
			go(){
				uni.redirectTo({
					url: '/pages/index/index',
				});
			}
		}
	}
</script>

<style>
	
	.viewView{
		height: 100vh;
		padding-top: 210upx;
	}
	.printBackground{
		background: #FD8524;
		width: 690upx;
		padding: 28upx 0 0;
		height: 210upx;
		font-size: 36upx;
		line-height: 48upx;
		margin: 0 auto 0;
		color: #FFFFFF;
		text-align: center;
	}
	.print{
		width: 100%;
		padding: 0 56upx;
		margin-top: -80upx;
	}
	.print>view{
		padding: 32upx 24upx 36upx 24upx;
		background-color: #fff;
		background: linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%);
		box-shadow: 0px -10px 12px rgba(0, 0, 0, 0.1);
	}
	.print>view .views{
		color: #333333;
		font-size: 28upx;
		line-height: 38upx;
		margin-bottom: 22upx;
		display: flex;
		justify-content:space-between;
	}
	.print>view s{
		margin: 44upx 0;
		border-top: 2upx dashed #707070;
		width: 100%;
		height: 2upx;
		display: block;
	}
	
</style>
