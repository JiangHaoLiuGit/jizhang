<template>
	<view>
		<header-nav :isBack="true" title="充值流水详细" v-if="headerBlean" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<header-nav :isBack="true" title="充值流水详细" :position="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<view class="paddingLeftRight">
			<view class="rechargeInfo borderRadius">
				<view class="top flexLeft">
					<image src="../../../static/pic16.png"></image>
					<text class="smallText threeColor">充值金额</text>
				</view>
				<view class="cent content">
					<image src="../../../static/pic15.png"></image>
					<text class="number fontWeight redColor">{{amount}}</text>
					<text class="yuan inText sixColor">元</text>
				</view>
			</view>
		</view>
		<view class="view" style="margin-bottom: 40upx;">
			<view class="twoItem">
				<view>充值企业</view>
				<view>{{enterpriseName}}</view>
			</view>
			<view class="twoItem">
				<view>原余额</view>
				<view class="fontWeight">{{beforeAmount}}元</view>
			</view>
			<view class="twoItem">
				<view>现余额</view>
				<view class="fontWeight orangeColor">{{afterAmount}}元</view>
			</view>
		</view>
		<view class="view">
			<view class="twoItem">
				<view>订单号</view>
				<view>{{number}}</view>
			</view>
			<view class="twoItem">
				<view>订单时间</view>
				<view>{{updateDate}}</view>
			</view>
			<view class="twoItem">
				<view>操作员</view>
				<view>{{preferentialGradeName}}</view>
			</view>
		</view>
		<button class="submitBtnGray absoluteBtn" @tap="goBack">返回</button>
	</view>
</template>

<script>
	import config from '../../../service/config.js'
	import ajax from '../../../service/ajax.js'
	import headerNav from '../../../components/headerNav/headerNav.vue'
	export default{
		data(){
			return {
				headerBlean:false,
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
			if(option.itemId){
				if(option.type == 0){
					this.rechargeId = option.itemId
					ajax.get(config.deductionRecharge_url,{
					  number:this.rechargeId
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
						  if(res.data.createName != null){
							  this.preferentialGradeName = res.data.createName
						  }
						  if(res.data.stationName != null){
							  this.stationName = res.data.stationName
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
				}else{
					this.rechargeId = option.itemId
					
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
						  if(res.data.preferentialGradeName != null){
							  this.preferentialGradeName = res.data.preferentialGradeName
						  }
						  if(res.data.stationName != null){
							  this.stationName = res.data.stationName
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
			}
		},
		onShow(){
			
					
		
		},
		onPageScroll(res){
			if(res.scrollTop > this.hearHeight){
				
				if(!this.headerBlean){
					this.headerBlean = true
				}
			}else{
				
				if(this.headerBlean){
					this.headerBlean = false
				}
				
			}
		},
		methods:{
			goBack() {
			    uni.navigateBack()
			},
		}
	}
</script>

<style>
	
	.rechargeInfo{
		margin-top: 40upx;
		margin-bottom: 20upx;
		background: #E8E8E8;
		padding: 18upx 16upx 36upx 16upx;
	}
	.rechargeInfo .top{
		
	}
	.rechargeInfo .top image{
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
		margin-right: 10upx;
	}
	.rechargeInfo .cent image{
		width: 60upx;
		height: 60upx;
		margin: 28upx 0 18upx;
	}
	.rechargeInfo .cent .number{
		font-size: 80upx;
		line-height: 106upx;
		margin: 0 26upx 0 10upx;
		
	}
	.rechargeInfo .cent .yuan{
		margin-top: 34upx;
	}
	
</style>
