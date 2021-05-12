<template>
	<view class="viewView">
		<header-nav :isBack="true" title="打印详情" :center="true" :fontColor="{'color': '#333'}" :bgColor="{'background-color': '#F4F4F4'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic17.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<view class="printBackground borderRadius">
			加油成功
		</view>
		<view class="print">
			<view>
				<view v-if="type != 1">
					<view class="views">
						<view>类型</view>
						<view>驾驶员加油</view>
					</view>
					<view class="views">
						<view>驾驶员</view>
						<view>{{driverName}}</view>
					</view>
				</view>
				<view class="views" v-else>
					<view>类型</view>
					<view>企业加油</view>
				</view>
				<view class="views">
					<view v-if="codeId != ''">挂靠名称</view>
					<view v-else>企业名称</view>
					<view>{{enterpriseName}}</view>
				</view>
				<view class="views" v-show="roles">
					<view>应收金额</view>
					<view>{{originalReceivable}}元</view>
				</view>
				<view class="views" v-show="!roles">
					<view>加油量</view>
					<view>{{fuelVolume}}升</view>
				</view>
				<view class="views" v-show="roles">
					<view>实收金额</view>
					<view>{{actualReceivable}}元</view>
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
					<view>{{gasStationPersonnelName}}</view>
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
				type:1,
				rechargeId:0,
				enterpriseName:"",
				originalReceivable:"",
				actualReceivable:"",
				number:"",
				updateDate:"",
				gasStationPersonnelName:"",
				codeId:"",
				//角色权限
				roles:true,
				driverName:"",
				fuelVolume:"",
				
			}
		},
		components:{
			headerNav
		},
		onLoad(option){
			console.log(this.$store.state.roles)
			console.log(option)
			if(this.$store.state.roles == 3){
				this.roles = false
			}
			if(option.rechargeId){
				if(option.codeId){
					this.codeId = option.codeId
					ajax.get(config.driverCode_url,{
					  driverCode:this.codeId,
					}).then(res => {
						console.log("司机吗获取司机信息")
						console.log(res)
						if(res.code == 0){
							this.driverName = res.data.driverName
						}
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}
				this.rechargeId = option.rechargeId
				this.type = option.type
				ajax.get(config.deductionId_url,{
				  id:this.rechargeId,
				  type:this.type
				}).then(res => {
				  console.log(res)
				            
				  if(res.code == 0){
					  this.enterpriseName = res.data.enterpriseName
					  this.fuelVolume = res.data.fuelVolume
					  this.actualReceivable = res.data.actualReceivable
					  this.originalReceivable = res.data.originalReceivable
					  this.number = res.data.number
					  if(res.data.gasStationPersonnelName == null){
						  this.gasStationPersonnelName = "张小雷"
					  }else{
						  this.gasStationPersonnelName = res.data.gasStationPersonnelName
					  }
					  if(this.$store.state.roles == 3){
					  	this.gasStationPersonnelName = res.data.createName
					  }
					  if(res.data.updateDate != ""){
						  let value = res.data.updateDate
						  let date = new Date();
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
					  }else{
						  this.updateDate = res.data.updateDate
					  }
					  // oilListArr:[]
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
