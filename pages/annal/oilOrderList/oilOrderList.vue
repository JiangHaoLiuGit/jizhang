<template>
	<view>
		<header-nav :isBack="true" title="加油流水详细" v-if="headerBlean" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<header-nav :isBack="true" title="加油流水详细" :position="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<view class="paddingLeftRight" v-show="roles">
			<view class="rechargeInfo borderRadius">
				<view class="top flexLeft">
					<image src="../../../static/pic16.png"></image>
					<text class="smallText threeColor">实收金额</text>
				</view>
				<view class="cent content">
					<image src="../../../static/pic15.png"></image>
					<text class="number fontWeight orangeColor">{{actualReceivable}}</text>
					<text class="yuan inText sixColor">元</text>
				</view>
				<view class="textView smallText sixColor">应收金额：{{originalReceivable}}</view>
			</view>
		</view>
		<view :class="roles == false ?'view views':'view'" style="margin-bottom: 40upx;">
			<view class="twoItem" v-if="codeId !=''">
				<view>驾驶员</view>
				<view>{{driverName}}</view>
			</view>
			<view class="twoItem">
				<view v-if="codeId != ''">挂靠名称</view>
				<view v-else>企业名称</view>
				<view>{{enterpriseName}}</view>
			</view>
			<view class="twoItem">
				<view>企业等级</view>
				<view>
					<image src="../../../static/pic36.png" mode="" v-if="preferentialGradeId == 1" style="width: 42upx;height: 39upx;"></image>
					<image src="../../../static/pic35.png" mode="" v-else-if="preferentialGradeId == 2" style="width: 42upx;height: 39upx;"></image>
					<image src="../../../static/pic12.png" mode="" v-else-if="preferentialGradeId == 3" style="width: 42upx;height: 39upx;"></image>
					<image src="../../../static/pic37.png" mode="" v-else-if="preferentialGradeId == 4" style="width: 42upx;height: 39upx;"></image>
					<image src="../../../static/pic38.png" mode="" v-else-if="preferentialGradeId == 5" style="width: 42upx;height: 39upx;"></image>
				</view>
				<!-- <view><image src="../../../static/pic12.png" mode="" style="width: 42upx;height: 36upx;"></image></view> -->
			</view>
			<view class="twoItem">
				<view>加油车辆</view>
				<view class="oilCar">
					<view class="carItem" v-for="(item,index) in oilListArr" :key="index">{{item.name}}</view>
				</view>
			</view>
		</view>
		
		<view class="view" style="margin-bottom: 40upx;">
			<view class="twoItem">
				<view>油号</view>
				<view>{{oilNumber}}</view>
			</view>
			<view class="twoItem">
				<view>加油量</view>
				<view class="fontWeight">{{fuelVolume}}升</view>
			</view>
			<view class="twoItem">
				<view>实际单价</view>
				<view class="fontWeight">{{originalPrice}}元</view>
			</view>
			<view class="twoItem" v-show="roles">
				<view>优惠单价</view>
				<view class="fontWeight orangeColor">{{actualPrice}}元</view>
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
				<view>{{gasStationPersonnelName}}</view>
			</view>
		</view>
		<button class="submitBtnyello" @tap="go">打印数据</button>
		
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
				//加油扣款id
				rechargeId:0,
				//企业是1,驾驶员是2
				type:1,
				oilListArr:[],
				carList:[],
				typeBlean:false,
				actualReceivable:"",
				originalReceivable:"",
				enterpriseName:"",
				preferentialGradeId:"",
				oilNumber:"",
				//角色权限
				roles:true,
				fuelVolume:"",
				originalPrice:"",
				actualPrice:"",
				number:"",
				gasStationPersonnelName:"",
				actualReceivable:"",
				updateDate:"",
				codeId:"",
				driverName:"",
			}
		},
		components:{
			headerNav
		},
		onLoad(option){
			if(option.itemId)this.itemId = option.itemId
			if(this.$store.state.roles == 3){
				this.roles = false
			}
			if(option.rechargeId){
				console.log(option)
				if(option.codeId){
					this.codeId = option.codeId
					ajax.get(config.driverCode_url,{
					  driverCode:this.codeId,
					}).then(res => {
						console.log("司机吗获取司机信息")
						console.log(res)
						if(res.code == 0){
							this.oilListArr = [{
								name:res.data.carNo
							}]
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
					  this.actualReceivable = res.data.actualReceivable
					  this.originalReceivable = res.data.originalReceivable
					  this.enterpriseName = res.data.enterpriseName
					  this.preferentialGradeId = res.data.preferentialGradeId
					  this.oilNumber = res.data.oilNumber
					  this.fuelVolume = res.data.fuelVolume
					  this.originalPrice = res.data.originalPrice
					  this.actualPrice = res.data.actualPrice
					  this.number = res.data.number
					  //createName
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
					  }else{
						  this.updateDate = res.data.updateDate
					  }
					  console.log(this.oilListArr)
					  //this.codeId 如果有那就是挂靠。跳过这一步
					  if(this.codeId == ""){
						  if(res.data.carNo.indexOf(",") != -1){
						  	let arr = [],
						  		
						  		arr1 = res.data.carNo.split(",")
						  	for(let i = 0 ; i < arr1.length ; i ++){
						  		let obj = {}
						  		obj.name = arr1[i]
						  		arr.push(obj)
						  	}
						  	console.log(arr)
						  	this.oilListArr = arr
						  }else{
						  	let obj = {}
						  	  obj.name = res.data.carNo
						  	this.oilListArr.push(obj)
						  }
					  }
					  // oilListArr:[]
				  }
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			}
			
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
			go(){
				if(this.codeId){
					uni.redirectTo({
						url: '/pages/annal/oilOrderPrint/oilOrderPrint?rechargeId='+this.rechargeId+"&&type="+this.type+"&&codeId="+this.codeId,
					});
				}else{
					uni.redirectTo({
						url: '/pages/annal/oilOrderPrint/oilOrderPrint?rechargeId='+this.rechargeId+"&&type="+this.type,
					});
				}
				
			}
		}
	}
</script>

<style>
	
	.view.views{
		margin-top: 40upx;
	}
	.rechargeInfo{
		margin-top: 40upx;
		margin-bottom: 20upx;
		background: #FFE0A2;
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
