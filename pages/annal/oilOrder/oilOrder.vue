<template>
	<view>
		<header-nav :isBack="true" title="加油结算" v-if="headerBlean" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<header-nav :isBack="true" title="加油结算" :position="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		
		<view class="view" style="margin-top: 40upx;">
			<view class="threeItem" v-if="type == 3">
				<view>驾驶员余额</view>
				<view class="orangeColor">{{amount}}</view>
				<view></view>
			</view>
			<view class="threeItem" v-else>
				<view>企业余额</view>
				<view class="orangeColor">{{amount}}</view>
				<view></view>
			</view>
			<view class="threeItem" v-if="type == 3">
				<view>驾驶员</view>
				<view>{{driverName}}</view>
				<view></view>
			</view>
			<view class="threeItem" v-if="type == 3">
				<view>挂靠企业</view>
				<view>{{enterpriseName}}</view>
				<view></view>
			</view>
			<view class="threeItem" v-else>
				<view>企业名称</view>
				<view>{{enterpriseName}}</view>
				<view></view>
			</view>
			<view class="threeItem">
				<view>企业等级</view>
				<view>
					<image src="../../../static/pic36.png" mode="" v-if="preferentialGradeId == 1" style="width: 42upx;height: 39upx;"></image>
					<image src="../../../static/pic35.png" mode="" v-else-if="preferentialGradeId == 2" style="width: 42upx;height: 39upx;"></image>
					<image src="../../../static/pic12.png" mode="" v-else-if="preferentialGradeId == 3" style="width: 42upx;height: 39upx;"></image>
					<image src="../../../static/pic37.png" mode="" v-else-if="preferentialGradeId == 4" style="width: 42upx;height: 39upx;"></image>
					<image src="../../../static/pic38.png" mode="" v-else-if="preferentialGradeId == 5" style="width: 42upx;height: 39upx;"></image>
					
				</view>
				<view></view>
			</view>
			<view class="threeItem">
				<view>加油车辆</view>
				<view class="oilCar" @click="toggleRightPopup">
					<view class="carItem" v-show="!carSwitch" v-for="(item,index) in carList" v-if="item.selects" :key="index">{{item.carNumber}}</view>
					<view class="carInput" v-show="carSwitch">
						<text>{{carInfo}}</text>
						<image src="../../../static/pic18.png"></image>
					</view>
				</view>
				<view></view>
			</view>
		</view>
		<view class="view" style="margin-top: 40upx;">
			<view class="threeItem">
				<view>油号</view>
				<view class="oilItems">
					<view class="oilitem">{{oilName}}</view>
				</view>
				<view></view>
			</view>
			<view class="threeItem">
				<view>加油量</view>
				<view>
					<!-- v-model="item.sutotal" -->
					<input type="number" v-model="numbers" :value="numbers" placeholder="请输入加油量">
				</view>
				<view></view>
			</view>
			<view class="threeItem">
				<view>实际单价</view>
				<view class="fontWeight">{{unitPrice}}</view>
				<view>元</view>
			</view>
			<view class="threeItem" v-show="roles">
				<view>优惠单价</view>
				<view class="fontWeight orangeColor">{{disUnitPrice}}</view>
				<view>元</view>
			</view>
			<view class="threeItem">
				<view>应收金额</view>
				<view class="fontWeight">{{totalPrice}}</view>
				<view>元</view>
			</view>
			<view class="threeItem" v-show="roles">
				<view>实收金额</view>
				<view class="fontWeight orangeColor">{{disTotalPrice}}</view>
				<view>元</view>
			</view>
		</view>
		
		<button class="submitBtnyello" @tap="go">提交加油信息</button>
		<!-- 抽屉 -->
		<uni-drawer class="" ref="popup" mode="right">
		    <view class="drawer" :style="[{'margin-top':statusBarH + 'upx'}]">
				<view class="search" @click="search">
					<view class="spaceBetween">
						<input type="text" v-model="searchTitle" @input="tan" placeholder="请选择车辆">
						<image src="../../../static/pic34.png" mode=""></image>
					</view>
				</view>
		        <view class="formSelect">
					<!--  -->
		        	<view class="viewSelect spaceBetween" v-show="carListBlean">
		        		<view :class="item.selects ? 'select content active' : 'select content'" v-for="(item,index) in carList" v-show="!item.hidden" :key="item.id" @click="selectActive(index)">
		        			{{item.carNumber}}
		        			<view class="icon content"><image src="../../../static/pic30.png" mode=""></image></view>
		        		</view>
		        	</view>
		        </view>
		    </view>
		</uni-drawer>
	</view>
</template>

<script>
	import config from '../../../service/config.js'
	import ajax from '../../../service/ajax.js'
	import uniDrawer from "@/components/uniUi/uni-drawer/uni-drawer.vue"
	export default{
		components:{
			uniDrawer
		},
		data(){
			return {
				//加油站点id
				stationId:"",
				//企业余额
				amount:0,
				//企业id
				enterpriseId:0,
				//公司名称
				enterpriseName:"",
				//企业vip等级id
				preferentialGradeId:"",
				//角色权限
				roles:true,
				
				///当前选择加油汽车的数量
				num:0,
				//油名称
				oilName:"",
				//当前时间
				myDateNow:"",
				headerBlean:false,
				statusBarH: this.statusBar*2,
				numbers:"",
				//实际单价
				unitPrice:0,
				//优惠单价
				disUnitPrice:0,
				//应收金额
				// totalPrice:0,
				//实收金额
				// disTotalPrice:0,
				carSwitch:true,
				//筛选数据
				searchTitle:"",
				//加油站id
				gasStationId:"",
				carList:[],
				isShow: {
				  right: false,
				},
				itemId:1,
				obj:"",
				//公司虚拟id
				id:0,
				carIds:"",
				//1是企业,2是企业驾驶员，3是挂靠驾驶员
				type:1,
				//加油流水id
				rechargeId:0,
				//加油按钮
				rechargeBlean:true,
				accountId:0,
				carInfo:"请选择加油车辆",
				driverName:"",
				driverFirm:false,
				carListBlean:false
				
			}
		},
		onLoad(option){
			this.stationId = this.$store.state.stationId
			if(this.$store.state.roles == 3){
				this.roles = false
			}
			console.log("加油站id:" + this.stationId)
			console.log(option)
			if(option.id){
				this.id = option.id
				if(option.type == 3){
					this.type = 2
				}else{
					if(option.type == 2){
						//这里是企业私有司机 应业务改动.这个不需要了.
						// this.driverFirm = true
					}
					this.type = 1
				}
				
				let url,data;
				//1是企业，2是企业加油员。这两位走的都是企业加油
				if(option.type == 1 || option.type == 2){
					//企业是这里 根据企业码获取企业信息
					url = config.infoById_url
					data ={
						enterpriseCode:this.id
					}
				//3是挂靠走的是挂靠加油。用的钱是自己的
				}else if(option.type == 3){
					this.carSwitch = false
					this.carInfo = "挂靠驾驶员默认车辆"
					//司机是这里 根据司机码获取司机信息
					url = config.driverCode_url
					data ={
						driverCode:this.id
					}
				}
				ajax.get(url,data)
				.then(res => {
				  console.log(res)
				  if(res.code == 0){
					  this.carList = [
						  {
								selects:true,
								carNumber:res.data.carNo
								
						  }
					  ]
					  
					  this.preferentialGradeId = res.data.preferentialGradeId
					  this.enterpriseName = res.data.enterpriseName
					  this.enterpriseId = res.data.id,
					  this.accountId = res.data.accountId
					  if(this.type == 2){
						  this.driverName = res.data.driverName
					  }
					  if(res.data.amount == null){
						  this.amount = 0
					  }else{
						  this.amount = res.data.amount/100
					  }
					  
					  ajax.get(config.carSelectList_url,{
						enterpriseId:res.data.id
					  }).then(res => {
						console.log("驾驶员")
						console.log(res)
						if(res.code == 0){
							let arr = res.data
							  for(let i = 0 ; i < arr.length ; i ++){
								  arr[i].selects = false
								  arr[i].hidden = false
							  }
							  this.carList = arr
							  if(this.carList.length > 0){
								  this.carListBlean = true
							  }
							  console.log(this.carList)
						}
					  }).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					  })
					  
					  ajax.get(config.todayStationId_url,{
						stationId:this.stationId,
						gradeId:this.preferentialGradeId
					  }).then(res => {
						console.log("加油界面今日油价信息")
						console.log(res)
						if(res.code == 0){
							this.oilName = res.data.name
							if(res.data.clinch == null || res.data.clinch == "" || res.data.clinch == undefined){
								this.disUnitPrice = (res.data.discount * res.data.cost *0.1).toFixed(2)
							}else{
								this.disUnitPrice = res.data.clinch.toFixed(2)
							}
							
							this.unitPrice = res.data.cost
						}
					  }).catch(err => {
						//ajax.js反馈的reject结果
						console.log(err)
					  })
				  }
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			}
			// //交易今日油价
			this.myDateNow = this.$myDateNow
			//获取加油站信息查询油价
			ajax.get(config.selectBy_url,{
				
			}).then(res => {
			  console.log(res)
			  if(res.code == 0){
				  // fuelName = "王小妍"
				  // this.fuelName = res.data.fuelName
				  // this.name = res.data.name
				  // this.name = "加油站"
				  this.gasStationId = res.data.id
				  
				  // //交易今日油价
				  ajax.get(config.Station_url,{
				    createDate:this.myDateNow,
				    gasStationId:this.gasStationId
				  }).then(res => {
					console.log("今日油价")
				    console.log(res)
				    if(res.code == 0){
				  	  
				    }else if(res.code == '-8016'){
						uni.showToast({ title: "今日还未设置油价.请联系管理员去设置今日油价",icon: "none",duration:2000 });
					}
				  }).catch(err => {
				    //ajax.js反馈的reject结果
				    console.log(err)
				  })
			  }
			}).catch(err => {
			  //ajax.js反馈的reject结果
			  console.log(err)
			})
			
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
		onShow(){
			
		},
		computed:{
			disTotalPrice(){
				return (this.numbers * this.disUnitPrice).toFixed(2)
			},
			totalPrice(){
				return (this.numbers * this.unitPrice).toFixed(2)
			}
		},
		methods:{
			goBack() {
			    uni.navigateBack()
			},
			
			go(){
				if(this.totalPrice > 0){
					if(this.type == 1){
						if(this.num == 0){
							uni.showToast({ title: "加油车辆必选",icon: "none",duration:2000 });
							return
						}
					}
					
					if(!this.rechargeBlean){
						uni.showToast({ title: "上一个订单还在生成中",icon: "none",duration:2000 });
						return
					}
					if(this.amount < this.disTotalPrice){
						uni.showToast({ title: "余额不足,请先去充值",icon: "none",duration:2000 });
						return
					}
					//this.numbers
					if(this.numbers > 9999){
						uni.showToast({ title: "加油量最多9999升",icon: "none",duration:2000 });
						return
					}
					uni.showLoading({
						title:"提交中..."
					})
					// uni.hideLoading()
					this.rechargeBlean = false //禁止用户重复点击充值按钮
					//carIds
					this.carIds = ""
					for(let i = 0 ; i < this.carList.length ; i ++){
						if(this.carList[i].selects){
							if(this.carIds == ""){
								this.carIds = this.carList[i].id
							}else{
								this.carIds = this.carIds + "," + this.carList[i].id
							}
						}
					}
					console.log(this.carIds)
					// uni.redirectTo({
					// 	url: '/pages/annal/oilOrderList/oilOrderList?disTotalPrice='+this.disTotalPrice+"&&itemId="+"0",
					// });
					let urlType = 1
					if(this.type == 2){
						urlType = 2
					}
					console.log(config.addCharge_url)
					ajax.post(config.addCharge_url,{
					  accountTransactionId:this.accountId,
					  fuelVolume:this.numbers,
					  originalPrice:this.unitPrice,
					  actualPrice:this.disUnitPrice,
					  originalReceivable:this.totalPrice,
					  actualReceivable:this.disTotalPrice,
					  oilNumber:this.oilName,
					  preferentialGradeId:this.preferentialGradeId,
					  type:urlType,
					  carIds:this.carIds,
					}).then(res => {
						console.log("提交加油")
					  console.log(res)
					  if(res.code == 0){
						  uni.hideLoading()
						  uni.showToast({ title: "提交成功",icon: "success",duration:2000 });
						  this.rechargeId = res.data
						  this.$store.commit("getOilId",res.data)
						  this.tim = setInterval(()=>{
						  	ajax.get(config.deductionId_url,{
						  	  id:this.rechargeId,
							  type:this.type
						  	}).then(res => {
						  	  console.log(res)
						  	  if(res.code == 0){
								  if(res.data != 0 && res.data != undefined && res.data != null){
									  console.log(res.data.status)
									  if(res.data.status == 0){
										  
									  }else if(res.data.status == 1){
										  this.$store.commit("getOilId",0)
										  this.rechargeBlean = true
										  clearInterval(this.tim)
										  if(this.type == 2){
											  uni.redirectTo({
												url: '/pages/annal/oilOrderList/oilOrderList?rechargeId='+this.rechargeId+"&&type="+this.type+"&&codeId="+this.id,
											  });
										  }else{
											  uni.redirectTo({
												url: '/pages/annal/oilOrderList/oilOrderList?rechargeId='+this.rechargeId+"&&type="+this.type,
											  });
										  }
										  
									  }else if(res.data.status == 2){
										  this.$store.commit("getOilId",0)
										  this.rechargeBlean = true
										  clearInterval(this.tim)
										  uni.showToast({ title: "本次订单已经被拒绝,请重新选择加油信息",icon: "none",duration:2000 });
									  }
									  
									  
								  }
						  	  }
						  	}).catch(err => {
						  	  //ajax.js反馈的reject结果
						  	  console.log(err)
						  	})				  
						  },2000)
					  }
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}else{
					console.log(this.carList)
					if(this.type == 1){
						if(this.carSwitch || this.num == 0){
							uni.showToast({ title: "加油车辆必选",icon: "none",duration:2000 });
						}
					}
					if(this.numbers == 0 || this.numbers == ""){
						uni.showToast({ title: "加油量不能填零或空",icon: "none",duration:2000 });
					}else if(this.numbers < 0){
						uni.showToast({ title: "加油量不能填负数",icon: "none",duration:2000 });
					}else if(this.totalPrice == 0){
						uni.showToast({ title: "金额为零,请检查原因",icon: "none",duration:2000 });
					}
					
					
				}
			},
			toggleRightPopup() {
				if(this.type == 1){
					this.$refs.popup.open()
				}else if(this.type == 2){
					uni.showToast({ title: "挂靠驾驶员暂时不开放选车功能.抱歉",icon: "none",duration:2000 });
				}
				
			},
			selectActive(index){
				
				if(this.carList[index].selects){
					//
					this.carList[index].selects = false
					
					//判断如果没有选择车辆.那么应该显示请选择this.carSwitch = false
					var smallSwitch = false
					for(let i = 0 ; i < this.carList.length ; i++){
						if(this.carList[i].selects == true){
							smallSwitch = true
							break//跳出for循环 continue是忽略本次for循环
						}
					}
					if(!smallSwitch){
						this.carSwitch = true
					}
				}else{
					if(this.driverFirm){
						for(let i = 0 ; i < this.carList.length ; i++){
							this.carList[i].selects = false
						}
					}
					this.carList[index].selects = true
					if(this.carSwitch){
						//隐藏
						this.carSwitch = false
					}
				}
				let num = 0;
				for(let i = 0 ; i < this.carList.length ; i ++){
					if(this.carList[i].selects){
						num ++
					}
				}
				this.num = num
			},
			search(){
				let title = this.searchTitle
				for(let i = 0 ; i < this.carList.length ; i ++){
					if(this.carList[i].carNumber.indexOf(title) == -1){
						this.carList[i].hidden = true
					}else{
						this.carList[i].hidden = false
					}
				}
			},
			tan(){
				if(this.searchTitle == ""){
					for(let i = 0 ; i < this.carList.length ; i ++){
						this.carList[i].hidden = false
					}
				}
			}
		}
	}
</script>

<style>
	
	.formSelect .viewSelect{
		padding: 0;
	}
	.select{
		width: 248upx;
	}
	.drawer{
		padding: 18upx 30upx 0;
	}
	.formSelect .viewSelect .select{
		padding: 4px 0px 5px;
	}
	.search{
		
		border-bottom: 2upx solid #FD8624;
	}
	.search>view{
		height: 72upx;
		background-color: #EAEAEA;
		padding-right: 16upx;
		border-radius: 8upx;
		margin-bottom: 18upx;
	}
	.search input{
		padding-left: 20upx;
		height: 72upx;
		width: 450upx;
	}
	.search image{
		width: 50upx;
		height: 50upx;
	}
	.viewSelect{
		flex-wrap:wrap;
	}
	.viewSelect .select{
		margin: 12upx 0;
	}
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
	
	:host {
	  font-size: 16px;
	}
	
	.center {
	  width: 60%;
	  padding: 20px;
	  text-align: center;
	  box-sizing: border-box;
	}
	
	.top {
	  color: #fff;
	  width: 100%;
	  padding: 20px;
	  border-radius: 0;
	  line-height: 20px;
	  background-color: rgba(0, 0, 0, 0.8) !important;
	}
	
	.bottom {
	  width: 100%;
	  padding: 20px;
	  line-height: 100px;
	  background-color: #fff;
	}
	
	.right {
	  width: 100%;
	  height: 100%;
	  padding: 20px;
	}
	
</style>
