<template>
	<view>
		<view class="head" :style="[{'padding-top':statusBarH + 'upx'}]">
			<view class="headUser content">
				<view class="hrefIndex">
					<image v-if="userSatate == 1" src="../../static/pic08.png" @click="go" mode=""></image>
				</view>
				<!-- {{name}} -->
				<view class="info">{{name}}</view>
				<view class="user smallText fffColor">{{fuelName}}</view>
			</view>
			<view class="ton" :class="type == 3?'active':''">
				<!-- active -->
				<view class="countView">今日统计</view>
				<view class="count clearfix">
					<view class="number left">
						<view class="num">{{refuelCount}}</view>
						<view class="text inText fffColor borderRadius">加油总额/元</view>
					</view>
					<view class="number right">
						<view class="num">{{rechargeCount}}</view>
						<view class="text inText fffColor borderRadius">充值总额/元</view>
					</view>
				</view>
			</view>
			
			<view class="box spaceAround">
				<view class="boxContent" data-index="1" @tap="indexNext">
					<view class="imageView content">
						<image src="../../static/pic09.png" mode="heightFix"></image>
					</view>
					<view class="text inText">加油结算</view>
				</view>
				<view class="boxContent" data-index="2" @tap="indexNext">
					<view class="imageView content">
						<image src="../../static/pic09.png" mode="heightFix"></image>
					</view>
					<view class="text inText">充值结算</view>
				</view>
				<view class="boxContent" data-index="3" @tap="indexNext">
					<view class="imageView content">
						<image src="../../static/pic10.png" mode="heightFix"></image>
					</view>
					<view class="text inText">加油流水</view>
				</view>
				<view class="boxContent" data-index="4" @tap="indexNext">
					<view class="imageView content">
						<image src="../../static/pic11.png" mode="heightFix"></image>
					</view>
					<view class="text inText">充值流水</view>
				</view>
			</view>
		</view>
		
		<view class="centerView">
			<view class="center">
				<view class="centTop spaceBetween">
					<text class="leftText inText">
						每日油价-0#柴油
					</text>
					<text class="rightText smallText">
						每天0点自动更新
					</text>
				</view>
				<view class="content spaceBetween first">
					<view v-for="item in arr1">{{item}}</view>
				</view>
				<view class="content spaceBetween second">
					<view v-for="item in arr2">{{item}}</view>
					<text class="text samll">原价</text>
				</view>
				<view class="content spaceBetween third">
					<view v-for="item in arr3">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="items borderRadius boxShadowSecond" v-for="(item , index) in items" :data-index="item.id" :key="index" @tap="href(item)">
				<block v-if="item.transactionType == 2">
					<view class="itemsTop first spaceBetween">
						<text class="threeColor smallText">订单号：{{item.number}}</text>
						<text class="threeColor tooSmallText">{{item.createDate}}</text>
					</view>
					<view class="itemsBottom spaceBetween">
						<view class="firmInfo">
							<view class="infoTop">
								<view class="first threeColor">
									{{item.name}}
								</view>
								<view class="second">
									<!-- <image style="width: 42upx;height: 39upx;" src="../../../static/pic12.png"></image> -->
									<image src="../../static/pic36.png" mode="" v-if="item.preferentialGradeId == 1" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic35.png" mode="" v-else-if="item.preferentialGradeId == 2" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic12.png" mode="" v-else-if="item.preferentialGradeId == 3" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic37.png" mode="" v-else-if="item.preferentialGradeId == 4" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic38.png" mode="" v-else-if="item.preferentialGradeId == 5" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic12.png" mode="" v-else style="width: 42upx;height: 39upx;"></image>
								</view>
							</view>
							<view class="infoBottom">
								<view class="first sixColor">
									单价：{{item.actualPrice}}元  
								</view>
								<view class="second sixColor">
									油量：{{item.fuelVolume}}升
								</view>
							</view>
						</view>
						<view class="consume">
							<view class="number">{{item.amount}}</view>
							<view class="yuan smallText sixColor">元</view>
						</view>
					</view>
				</block>
				<block v-else-if="item.transactionType == 1">
					<view class="itemsTop second spaceBetween">
						<text class="threeColor smallText">订单号：{{item.number}}</text>
						<text class="threeColor tooSmallText">{{item.createDate}}</text>
					</view>
					<view class="itemsBottom spaceBetween">
						<view class="firmInfo">
							<view class="infoTop">
								<view class="first threeColor">
									{{item.name}}
								</view>
								<view class="second">
									<image src="../../static/pic36.png" mode="" v-if="item.preferentialGradeId == 1" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic35.png" mode="" v-else-if="item.preferentialGradeId == 2" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic12.png" mode="" v-else-if="item.preferentialGradeId == 3" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic37.png" mode="" v-else-if="item.preferentialGradeId == 4" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic38.png" mode="" v-else-if="item.preferentialGradeId == 5" style="width: 42upx;height: 39upx;"></image>
									<image src="../../static/pic12.png" mode="" v-else style="width: 42upx;height: 39upx;"></image>
								</view>
							</view>
							<view class="infoBottom">
								<view class="first sixColor">
									<!-- {{item.beforeAmount/100}} -->
									原余额：{{item.beforeAmount}}元  
								</view>
								<view class="second sixColor">
									<!-- {{item.afterAmount/100}} -->
									现余额：{{item.afterAmount}}元
								</view>
							</view>
						</view>
						<view class="consume">
							<view class="number">
							<!-- {{item.amount/100}} -->
							{{item.amount}}
							</view>
							<view class="yuan smallText sixColor">元</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	
	import config from '../../service/config.js'
	import ajax from '../../service/ajax.js'
	export default {

		data() {
			return {
				arr1:[],
				arr2:[],
				arr3:[],
				rechargeCount:0,//充值统计
				refuelCount:0,//加油统计
				statusBarH: this.statusBar*2,
				shenfen:"",//新增身份证图片路径
				shenfenNew:"",//修改身份证图片路径
				myDateNow:"",
				items:[],
				userSatate:1,
				name:"",//加油站点名称
				fuelName:"",//加油员名称
				nameId:"",//加油员id
				gasStationId:"",//加油站名称
				type:""
			}
		},
		onLoad() {
			
			this.myDateNow = this.$myDateNow
			console.log(this.$store.state.roles)
			this.type = this.$store.state.roles
			if(this.$store.state.roles != 1){
				this.userSatate = 2
			}
		},
		onShow(){
			
			
			//加油站
			ajax.get(config.selectBy_url,{
			  
			}).then(res => {
				console.log("加油站信息")
			  console.log(res)
			  if(res.code == 0){
				  //每日统计
				  ajax.get(config.todayInfo_url,{
				    date:this.myDateNow,
				    siteId:res.data.id
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
				  // this.fuelName = "王小妍"
				  this.fuelName = res.data.fuelName
				  this.name = res.data.name
				  // this.name = "加油站"
				  this.gasStationId = res.data.id
				  this.$store.commit("getStationId",res.data.id)
				  // //交易今日油价
				  ajax.get(config.Station_url,{
				    createDate:this.myDateNow,
				    gasStationId:this.gasStationId
				  }).then(res => {
					console.log("今日油价")
				    console.log(res)
				    if(res.code == 0){
						this.arr1 = []
						for(let i = 0 ; i < res.data.length ; i ++){
						  this.arr1.push(res.data[i].preferentialGradeName)
						}
						this.arr2 = []
						for(let i = 0 ; i < res.data.length ; i ++){
						  this.arr2.push(res.data[i].cost)
						}
						this.arr3 = []
						for(let i = 0 ; i < res.data.length ; i ++){
							let num = (res.data[i].clinch).toFixed(2)
						  this.arr3.push(num)
						}
				    }
					if(this.arr1.length == 0){
						this.arr1 = ["未设置","未设置","未设置","未设置"]
					}
					if(this.arr2.length == 0){
						this.arr2 = ["未设置","未设置","未设置","未设置"]
					}
					if(this.arr3.length == 0){
						this.arr3 = ["未设置","未设置","未设置","未设置"]
					}
					if(this.$store.state.roles == 3){
						this.arr3 = ["","","",""]
					}
				  }).catch(err => {
				    //ajax.js反馈的reject结果
				    console.log(err)
				  })
				  //权限限制
				  if(this.$store.state.roles == 3){
					  
				  }else{
					  
					  ajax.get(config.selectList_url,{
						  type:1,
						  pageIndex:1,
						  stationId:this.gasStationId
					  }).then(res => {
						  console.log("交易流水列表")
					  	console.log(res)
					  	if(res.code == 0){
							let arrr = []
					  		let arr = res.data
					  		for(let i = 0 ; i < 3 ; i ++){
								arrr.push(arr[i])
					  		}
							for(let i = 0 ; i < arrr.length ; i ++){
								let value = arrr[i].createDate
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
								arrr[i].createDate =  y + '/' + MM + '/' + d + ' ' + h + ":" + m + ":" + s;
								if(arrr[i].afterAmount != null){
									arrr[i].afterAmount = (arrr[i].afterAmount/100).toFixed(2)
								}
								if(arrr[i].beforeAmount != null){
									arrr[i].beforeAmount = (arrr[i].beforeAmount/100).toFixed(2)
								}
								if(arrr[i].amount != null && arrr[i].transactionType == 1){
									arrr[i].amount = (arrr[i].amount/100).toFixed(0)
								}else{
									arrr[i].amount = (arrr[i].amount/100).toFixed(2)
								}
							}
					  		this.items = arrr
					  	}
					  }).catch(err => {
					    //ajax.js反馈的reject结果
					    console.log(err)
					  })
				  }
				  
			  }
			}).catch(err => {
			  //ajax.js反馈的reject结果
			  console.log(err)
			})
		},
		methods: {
			indexNext:function(e){
				let dataset = e.currentTarget.dataset,
					index = dataset.index;
				//
				if(index == "4"){
					if(this.$store.state.roles == 3){
						uni.showToast({ title: "该账号没有查看充值流水权限",icon: "none" ,duration:2000});
					}else{
						uni.navigateTo({
							url: '/pages/annal/RechargeList/RechargeList',
						});
					}
				}else if(index == "3"){
					if(this.$store.state.roles == 3){
						uni.showToast({ title: "该账号没有查看加油流水权限",icon: "none" ,duration:2000});
					}else{
						uni.navigateTo({
							url: '/pages/annal/oilList/oilList',
						});
					}
					
				}else if(index == "1"){
					this.sao(index)
					// uni.navigateTo({
					// 	url: '/pages/annal/oilOrder/oilOrder',
					// });
					
				}else if(index == "2"){
					if(this.$store.state.roles == 3){
						uni.showToast({ title: "该账号没有充值功能权限",icon: "none" ,duration:2000});
					}else{
						this.sao(index)
					}
					
					// uni.navigateTo({
					// 	url: '/pages/annal/RechargeOrder/RechargeOrder',
					// });
				}
			},
			go:function(){
				uni.navigateTo({
					url: '/pages/manager/managerIndex/managerIndex',
				});
			},
			href(item){
				//.transactionType,item.id
				console.log(item)
				if(item.transactionType == 1){
					uni.navigateTo({
						url: '/pages/annal/RechargeItem/RechargeItem?itemId=' + item.number + "&&type=0",
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					
				}else if(item.transactionType == 2){
					uni.navigateTo({
						url: '/pages/annal/oilItem/oilItem?itemId=' + item.number + "&&type=" + item.numberType + "&&types=0",
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			sao:function(index){	
				// uni.navigateTo({
				// 	url: '/pages/annal/oilOrder/oilOrder',
				// });
				if(index == 1){
					//加油
					//0001,3 挂靠
					//88888,1
					// #ifdef H5
					//"439b84ff60284646a8a954c0b5feeb8f,1"
					var data = "88888,1"
					var arrNew = data.split(",")
					data = arrNew[0]
					let type = arrNew[1]
					let url,
						date;
					if(type == 1 || type == 2){
						url = config.infoById_url
						date = {
								enterpriseCode:data
							}
					}else if(type == 3){
						url = config.driverCode_url
						date = {
								driverCode:data
							}
					}
					
					ajax.get(url,date).then(res => {
					  console.log(res)
					  if(res.code == 0){
						  if(res.data != 0 && res.data != undefined && res.data != null){
							  //证明企业码真是有效
							  uni.navigateTo({
								url: '/pages/annal/oilOrder/oilOrder?id=' + data + "&&type="+type,
							  });
						  }else{
							  uni.showToast({ title: "扫码失败.请重试",icon: "none" ,duration:2000});
						  }
					  }else{
						  uni.showToast({ title: "扫码失败.请重试",icon: "none" ,duration:2000});
					  }
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
					
					
					// #endif
					//#ifdef APP-PLUS
					
					uni.scanCode({
						success:function(res){
							var data = res.result
							// uni.showToast({ title: data,icon: "none" ,duration:2000});
							var arrNew = data.split(",")
							data = arrNew[0]
							let type = arrNew[1]
							let url,
								date;
							if(type == 1 || type == 2){
								url = config.infoById_url
								date = {
										enterpriseCode:data
									}
							}else if(type == 3){
								url = config.driverCode_url
								date = {
										driverCode:data
									}
							}
							ajax.get(url,date).then(res => {
							  console.log(res)
							  if(res.code == 0){
								  if(res.data != 0 && res.data != undefined && res.data != null){
									  uni.navigateTo({
									  	url: '/pages/annal/oilOrder/oilOrder?id=' + data + "&&type="+type,
									  });
								  }else{
									  uni.showToast({ title: "扫码失败,请重试",icon: "none" ,duration:2000});
								  }
							  }else{
								  uni.showToast({ title: "扫码失败.请重试",icon: "none" ,duration:2000});
							  }
							}).catch(err => {
							  //ajax.js反馈的reject结果
							  console.log(err)
							})
						},
						fail: function(err) {
							console.log('扫码失败', err)
						}
					});
					//#endif
				}else if(index == 2){
					//充值
					// #ifdef H5
					var data = "88888"
					ajax.get(config.infoById_url,{
					  enterpriseCode:data
					}).then(res => {
					  console.log(res)
					  if(res.code == 0){
						  if(res.data != 0 && res.data != undefined && res.data != null){
							  uni.navigateTo({
							  	url: '/pages/annal/RechargeOrder/RechargeOrder?id=' + data,
								//?id=' + data
							  });
						  }else{
							  uni.showToast({ title: "扫码失败,请重试",icon: "none" ,duration:2000});
						  }
					  }else{
						  uni.showToast({ title: "扫码失败.请重试",icon: "none" ,duration:2000});
					  }
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
					// #endif
					//#ifdef APP-PLUS
					uni.scanCode({
						success:function(res){
							var data = res.result
							ajax.get(config.infoById_url,{
							  enterpriseCode:data
							}).then(res => {
							  console.log(res)
							  if(res.code == 0){
								  if(res.data != 0 && res.data != undefined && res.data != null){
									  uni.navigateTo({
									  	url: '/pages/annal/RechargeOrder/RechargeOrder?id=' + data,
									  });
								  }else{
									  uni.showToast({ title: "扫码失败,请重试",icon: "none" ,duration:2000});
								  }
							  }else{
								  uni.showToast({ title: "扫码失败.请重试",icon: "none" ,duration:2000});
							  }
							}).catch(err => {
							  //ajax.js反馈的reject结果
							  console.log(err)
							})
						},
						fail: function(err) {
							console.log('扫码失败', err)
						}
					});
					//#endif
				}
				
				
			},
			
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	
	.zyby-img-upload-common {
	        height: 450rpx;
	        width: 100%;
	        margin-top: 26rpx;
	    }
	
	    .auth-img-item {
	        position: relative;
	
	        >div:first-child {
	            height: 100%;
	            flex-direction: column;
	
	            image {
	                
	            }
	
	            .text-desc {
	                margin-top: 20rpx;
	                font-family: PingFangSC-Regular;
	                font-size: 26rpx;
	                color: #000;
	            }
	        }
	
	        .exist-img {
	            width: 100%;
	            height: 100%;
	        }
	
	        .upload-progress {
	            position: absolute;
	            bottom: 0;
	            right: 0;
	            left: 0;
	        }
	
	        .img-delete {
	            position: absolute;
	            top: 10rpx;
	            right: 10rpx;
	        }
	    }
	
	    .img-item-special {
	        border: 1px dashed #13DBBF;
	        /*no*/
	        border-radius: 6rpx;
	        /*no*/
	    }
	
	
	.head{
		background:url(../../static/pic05.png)repeat-x;
		padding: 45upx 30upx 0;
		background-size: contain;
	}
	.head .headUser{
		height: 60upx;
		justify-content: space-between;
	}
	.head .headUser .hrefIndex{
		line-height: 1;
		width: 60upx;
		height: 60upx;
	}
	.head .headUser .hrefIndex image{
		width: 60upx;
		height: 60upx;
	}
	.head .headUser .info{
		font-size: 38upx;
		line-height: 54upx;
		color: #fff;
	}
	.head .ton{
		height: 250rpx;
	}
	.head .ton.active{
		opacity: 0;
	}
	.head .countView{
		font-size: 32upx;
		line-height: 42upx;
		color: #333;
		margin: 22upx 0 12upx;
	}
	.head .count{
		padding-bottom: 42upx;
	}
	.head .count .number{
		width: 50%;
		display: flex;
		justify-content:center;
		flex-wrap:wrap;
	}
	.head .count .number .num{
		font-size: 60upx;
		line-height: 80upx;
		width: 100%;
		text-align: center;
		color: #333;
	}
	.head .count .number .text{
		height: 44upx;
		background: #6E6E6E;
		padding: 5upx 14upx;
	}
	.head .box{
		height: 240upx;
		border-radius: 20upx;
		background-image: linear-gradient(#fff, #F4F4F4);
	}
	.head .boxContent{
		width: 120upx;
	}
	.head .boxContent .imageView{
		width: 120upx;
		height: 120upx;
		border-radius: 20upx;
	}
	.head .boxContent:nth-of-type(1) .imageView{
		background: #FEB62B;
	}
	.head .boxContent:nth-of-type(2) .imageView{
		background: #FD7D23;
	}
	.head .boxContent:nth-of-type(3) .imageView{
		background: #A15531;
	}
	.head .boxContent:nth-of-type(4) .imageView{
		background: #1CB88C;
	}
	.head .boxContent:nth-of-type(3) .imageView image,.head .boxContent:nth-of-type(4) .imageView image{
		width: 80upx;
		height: 80upx;
	}
	.head .boxContent .imageView image{
		width: 68upx;
		height: 68upx;
	}
	.head .boxContent .text{
		color: #333;
		margin-top: 16upx;
		display: inline;
	}
	.center{
		border-radius: 20upx;
		padding: 10upx 22upx 32upx 20upx;
		/* background-image: linear-gradient(, ); */
		background-image: linear-gradient(to right, #EC812E , #E2492C);
		color: #fff;
	}
	.centerView{
		padding: 0 30upx;
	}
	.center .content{
		padding-left: 74upx;
	}
	.center .content.first{
		margin-top: 26upx;
	}
	.center .content.first view{
		background:#FD8023;
		color: #fff;
	}
	.center .content.second{
		margin-top: 20upx;
		position: relative;
	}
	.center .content.second view{
		background:#E8E8E8;
		color: #333;
	}
	.center .content.second text.text{
		position: absolute;
		top: -6upx;
		left: 0;
	}
	.center .content.third{
		margin-top: 10upx;
	}
	.center .content.third view{
		background:#fff;
		color: #FD0D1B;
	}
	.center .content view{
		width: 130upx;
		height: 40upx;
		border-radius: 4upx;
		padding: 4upx 16upx 4upx 18upx;
		font-size: 24upx;
		line-height: 32upx;
	}
	.centerText .text{
		position: relative;
		top: 10upx;
	}
	.bottom{
		padding: 0 30upx;
	}
	.formContent{
		margin-top: 34upx;
	}
	
	.formContent .phoneView{
	  margin-bottom: 20rpx;
	}
	.formContent .phoneView .text{
	  width: 500rpx;
	}
	.formContent .phoneView .text.sucess{
	  color: #2AC980;
	}
	.formContent .phoneView .text.fail{
	  color: red;
	}
	.formContent .phoneView button{
	  width: 182rpx;
	  height: 80rpx;
	  background: #FC5E4B;
	  font-size: 24rpx;
	  line-height: 75rpx;
	  color: #fff;
	  margin-top: 0;
	}
	.formContent .box{
	  margin-top: 10rpx;
	  padding: 14rpx 22rpx 12rpx 26rpx;
	  background: #fff;
	  border: 2px dashed #E3E3E3;
	}
	.ge{
	  
	}
	.formContent .box .addImg{
	  width: 140rpx;
	  height: 140rpx;
	  background: #E8E8E8;
	}
	.formContent .box .addImg .clickImg{
	  width: 80rpx;
	  height: 80rpx;
	}
	.formContent .box .addImg .image{
	  max-width: 140rpx;
	  max-height: 140rpx;
	}
	.formContent .box .viewText{
	  padding-left: 14rpx;
	}
	.formContent .box .viewText text{
	  display: block;
	  margin-bottom: 0;
	}
	.formContent .box .viewText text.head{
	  font-size: 28rpx;
	  color: #2E95FA;
	  line-height: 34rpx;
	}
	.formContent .box .viewText text.txt{
	  font-size: 24rpx;
	  color: #999999;
	  line-height: 34rpx;
	}
	.formContent .box .caseImg{
	  height: 144rpx;
	  width: 97rpx;
	  border: 2px dashed #E3E3E3;
	}
	.formContent .box.idCard .addImg{
	  width: 234rpx;
	}
	.formContent .box.idCard .addImg .clickImg{
	  width: 234rpx;
	  height: 140rpx;
	}
	.formContent .box.idCard .addImg .image{
	  max-width: 234rpx;
	  max-height: 140rpx;
	}
	.formContent .box.idCard .viewText{
	  padding-left: 84rpx;
	  padding-top: 16rpx;
	}
	
</style>
