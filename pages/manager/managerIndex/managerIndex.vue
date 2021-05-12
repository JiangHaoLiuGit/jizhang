<template>
	<view class="page">
		<view class="head" :style="[{'padding-top':statusBarH + 'upx'}]">
			<view class="title">
				记账管理平台
				<image @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			</view>
			<view class="user">
				<view class="userImg content fffBackground borderRadiusYuan">
					<image src="../../../static/pic20.png"></image>
				</view>
				<view class="userName threeColor fontWeight bigText">管理员：{{userName}}</view>
			</view>
		</view>
		<view class="contView">
			<view class="imageViewFirst">
				<image src="../../../static/pic31.png"></image>
			</view>
			<view class="imageViewSecond">
				<view class="box por">
					<image class="imageFirst left poa" src="../../../static/pic33.png"></image>
					<image class="imageSecond left poa" src="../../../static/pic32.png"></image>
				</view>
			</view>
			<view class="count spaceBetween">
				<text class="smallText threeColor">今日加油金额(元)</text>
				<text class="smallText threeColor">今日充值金额(元)</text>
			</view>
			<view class="countNum content spaceBetween">
				<view class="cont flexLeft first">
					<view class="content icon borderRadiousYuan yellowBackground">
						<image src="../../../static/pic21.png"></image>
					</view>
					<view class="text">
						{{refuelCount}}
					</view>
				</view>
				<view class="cont flexLeft" style="padding-left: 40upx;">
					<view class="content icon borderRadiousYuan orangeBackground">
						<image src="../../../static/pic22.png"></image>
					</view>
					<view class="text">
						{{rechargeCount}}
					</view>
				</view>
			</view>
			<view class="viewBox">
				<view class="countItem first" @click="go" data-index="0">
					<view class="viewfirst">
						<view class="left">
							<image src="../../../static/pic23.png"></image>
						</view>
						<text class="left">每日油价管理</text>
					</view>
					<view class="viewSecond">
						<image class="right" src="../../../static/pic27.png" mode=""></image>
						<text v-if="status == 0" class="right">未设置</text>
						<text v-else class="right active fontWeight">已设置</text>
					</view>
				</view>
				<view class="countItem" @click="go" data-index="1">
					<view class="viewfirst">
						<view class="left">
							<image src="../../../static/pic24.png"></image>
						</view>
						<text class="left">加油记录管理</text>
					</view>
					<view class="viewSecond">
						<image src="../../../static/pic27.png" mode=""></image>
					</view>
				</view>
				<view class="countItem" @click="go" data-index="2">
					<view class="viewfirst">
						<view class="left">
							<image src="../../../static/pic25.png"></image>
						</view>
						<text class="left">充值记录管理</text>
					</view>
					<view class="viewSecond">
						<image src="../../../static/pic27.png" mode=""></image>
					</view>
				</view>
				<view class="countItem" @click="go" data-index="3">
					<view class="viewfirst">
						<view class="left">
							<image src="../../../static/pic26.png"></image>
						</view>
						<text class="left">加油员管理</text>
					</view>
					<view class="viewSecond">
						<image src="../../../static/pic27.png" mode=""></image>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import config from '../../../service/config.js'
	import ajax from '../../../service/ajax.js'
	export default {
		data() {
			return {
				userName:"张大牛",
				statusBarH: this.statusBar*2,
				status:0,
				rechargeCount:0,//充值统计
				refuelCount:0,//加油统计
				myDateNow:"",
				gasStationId:0,
				
			}
		},
		onLoad() {
			
			this.gasStationId = this.$store.state.stationId
			this.myDateNow = this.$myDateNow
			
		},
		onShow(){
			//每日统计
			ajax.get(config.todayInfo_url,{
			  date:this.myDateNow,
			  siteId:this.gasStationId
			}).then(res => {
			  console.log(res)
			  if(res.code == 0){
				  this.rechargeCount = res.data.rechargeCount
				  this.refuelCount = res.data.refuelCount
			  }
			}).catch(err => {
			  //ajax.js反馈的reject结果
			  console.log(err)
			})
			// //交易今日油价
			ajax.get(config.Station_url,{
			  createDate:this.myDateNow,
			  gasStationId:this.gasStationId
			}).then(res => {
				console.log("今日油价")
			  console.log(res)
			  if(res.data.length > 0){
				  this.status = 1
			  }else{
				  this.status = 0
			  }
			  
			}).catch(err => {
			  //ajax.js反馈的reject结果
			  console.log(err)
			})
		},
		methods: {
			goBack() {
			    uni.navigateBack()
			},
			go:function(e){
				let index = e.currentTarget.dataset.index
				if(index == 0){
					uni.navigateTo({
						url:"../../manager/oilPrice/oilPrice"
					})
				}else if(index == 1){
					uni.navigateTo({
						url:"../../annal/oilList/oilList?status=" + "1"
					})
				}else if(index == 2){
					uni.navigateTo({
						url:"../../annal/RechargeList/RechargeList?status=" + "1"
					})
				}else if(index == 3){
					uni.navigateTo({
						url:"../../manager/admin/admin"
					})
				}
			}
		}
	}
	
</script>

<style>
	
	
	.countItem{
		width: 100%;
		height: 100upx;
		background: #fff;
		padding: 20upx 44upx 20upx 40upx;
		margin-bottom: 2px;
	}
	.countItem.first{
		margin: 40upx 0;
	}
	.countItem .viewfirst{
		width: 50%;
		float:left;
	}
	
	.countItem .viewfirst>view{
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		display: flex;
		justify-content:center;
		align-items:center;
	}
	
	.viewBox .countItem:nth-of-type(1) .viewfirst>view{
		background: #3AC1EC;
	}
	.viewBox .countItem:nth-of-type(2) .viewfirst>view{
		background: #FB9260;
	}
	.viewBox .countItem:nth-of-type(3) .viewfirst>view{
		background: #8CD64F;
	}
	.viewBox .countItem:nth-of-type(4) .viewfirst>view{
		background: #A9C2EA;
	}
	.countItem .viewfirst>view image{
		width: 40upx;
		height: 40upx;
	}
	.countItem .viewfirst>text{
		padding-left: 26upx;
		font-size: 32upx;
		line-height: 42upx;
		padding-top: 8upx;
		color: #333;
	}
	.countItem .viewSecond{
		width: 50%;
		float:left;
	}
	.countItem .viewSecond text{
		padding-right: 20upx;
		font-size: 24upx;
		line-height: 32upx;
		padding-top: 14upx;
		color: #333;
	}
	.countItem .viewSecond text.active{
		color: #FD0D1B;
	}
	.countItem .viewSecond image{
		width: 20upx;
		height: 36upx;
		margin-top: 12upx;
		float: right;
	}
	
	.imageViewFirst image{
		width: 220upx;
		height: 142upx;
	}
	.imageViewFirst{
		width: 182upx;
		height: 142upx;
		overflow: hidden;
		position: absolute;
		top: -100upx;
		left: 0;
		z-index: 1;
	}
	.imageViewFirst image{
		margin-left: -50upx;
	}
	.imageViewSecond{
		width: 264upx;
		height: 154upx;
		position: absolute;
		right: 0;
		top: -112upx;
		z-index: 1;
	}
	.imageViewSecond .box{
		width: 264upx;
		height: 154upx;
	}
	.imageViewSecond .imageFirst{
		width: 130upx;
		height: 86upx;
		left: 0;
		bottom: 0;
		z-index: 2;
	}
	.imageViewSecond .imageSecond{
		width: 338upx;
		height: 154upx;
		left: 52upx;
		bottom: 0;
		z-index: 1;
	}
	.page{
		width: 750upx;
		overflow-x: hidden;
	}
	.contView{
		position: relative;
		margin-top: -200upx;
		padding-top: 42upx;
	}
	.contView .count{
		height: 32upx;
		padding: 0 40upx;
		z-index: 2;
		position: absolute;
		top: -3upx;
		left: 0;
		width: 100%;
	}
	.contView .countNum{
		width: 100%;
		height: 120upx;
		background: #FFFFFF;
		padding: 20upx 40upx;
	}
	.contView .countNum .cont{
		width: 50%;
		height: 80upx;
	}
	.contView .countNum .cont.first{
		border-right: 2upx solid #D5D5D5;
	}
	.contView .countNum .cont .icon{
		width: 80upx;
		height: 80upx;
	}
	.contView .countNum .cont .icon image{
		width: 60upx;
		height: 60upx;
	}
	.contView .countNum .cont .text{
		font-size: 44upx;
		line-height: 80upx;
		padding-left: 20upx;
	}
	.head{
		height: 540upx;
		/* background: url(../../../static/pic19.png);
		background-repeat:no-repeat;
		background-size:cover; */
		background: linear-gradient(180deg, #FD8C25 0%, rgba(236, 179, 55, 0.87) 31%, #F4F4F4 100%);
		box-sizing: content-box;
	}
	.head .title{
		font-size: 40upx;
		line-height: 54upx;
		color:#fff;
		text-align: center;
		margin: 0 0 44upx;
		position: relative;
	}
	.head .title .navImg{
		position: absolute;
		left: 30upx;
		top: 10upx;
	}
	.head .user{
		
	}
	.head .user .userImg{
		width: 160upx;
		height: 160upx;
		border: 6upx solid #FD8C25;
		margin: 0 auto;
	}
	.head .user image{
		width: 128upx;
		height: 128upx;
	}
	.head .user .userName{
		margin-top: 20upx;
		text-align: center;
	}
	
	
</style>
