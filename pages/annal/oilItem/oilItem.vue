<template>
	<view>
		<header-nav :isBack="true" title="加油流水明细" v-if="headerBlean" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<header-nav :isBack="true" title="加油流水明细" :position="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<view class="paddingLeftRight">
			<view class="rechargeInfo borderRadius">
				<view class="top flexLeft">
					<image src="../../../static/pic16.png"></image>
					<text class="smallText threeColor">实收金额</text>
				</view>
				<view class="cent content">
					<image src="../../../static/pic15.png"></image>
					<text class="number fontWeight redColor">{{actualReceivable}}</text>
					<text class="yuan inText sixColor">元</text>
				</view>
				<view class="textView smallText sixColor">应收金额：{{originalReceivable}}</view>
			</view>
		</view>
		<view class="view" style="margin-bottom: 40upx;">
			<view class="twoItem" v-if="type == 2">
				<view>驾驶员</view>
				<view>{{driverName}}</view>
			</view>
			<view class="twoItem">
				<view>企业名称</view>
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
			</view>
			<view class="twoItem" v-if="type == 1">
				<view>加油车辆</view>
				<view class="oilCar">
					<view class="carItem" v-for="(item,index) in oilListArr" :key="index">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="view">
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
			<view class="twoItem">
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
		<button class="submitBtnGray" @click="goBack">返回</button>
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
				oilListArr:[],
				carList:[],
				typeBlean:false,
				actualReceivable:"",
				originalReceivable:"",
				enterpriseName:"",
				preferentialGradeId:"",
				oilNumber:"",
				fuelVolume:"",
				originalPrice:"",
				actualPrice:"",
				number:"",
				gasStationPersonnelName:"",
				actualReceivable:"",
				updateDate:"",
				itemId:1,
				rechargeId:0,
				//企业是1,驾驶员是2
				type:1,
			}
		},
		components:{
			headerNav
		},
		onLoad(option){
			console.log(option)
			if(option.itemId){
				this.type = option.type
				if(option.types){
					this.type = option.type
					this.rechargeId = option.itemId
					ajax.get(config.deductionOil_url,{
					  number:this.rechargeId,
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
						  this.driverName = res.data.driverName
						  //gasStationPersonnelName
						  if(res.data.createName == null){
							  this.gasStationPersonnelName = "张小雷"
						  }else{
							  this.gasStationPersonnelName = res.data.createName
						  }
						  
						  if(res.data.updateDate != ""){
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
						  // oilListArr:[]
					  }
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}else{
					this.rechargeId = option.itemId
					ajax.get(config.deductionId_url,{
					  id:this.rechargeId,
					  type:option.type,
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
						  this.driverName = res.data.driverName
						  if(res.data.gasStationPersonnelName == null){
							  this.gasStationPersonnelName = "张小雷"
						  }else{
							  this.gasStationPersonnelName = res.data.gasStationPersonnelName
						  }
						  
						  if(res.data.updateDate){
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
						  // oilListArr:[]
					  }
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}
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
