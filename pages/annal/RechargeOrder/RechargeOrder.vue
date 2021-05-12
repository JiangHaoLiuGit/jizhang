<template>
	<view class="page">
		<header-nav :isBack="true" v-if="headerBlean" title="充值结算" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<header-nav :isBack="true" title="充值结算" :position="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<view class="view" style="margin-top: 40upx;">
			<view class="threeItem">
				<view>当前余额</view>
				<view class="orangeColor">{{amount}}</view>
				<view></view>
			</view>
			<view class="threeItem">
				<view>企业名称</view>
				<view class="fontWeight">{{enterpriseName}}</view>
				<view></view>
			</view>
		</view>
		<view class="view" style="margin-top: 40upx;">
			<view class="threeItem">
				<view>充值金额</view>
				<view>
					<!-- v-model="item.sutotal" -->
					<input type="number" @blur="numberBlur" v-model="numbers" :value="numbers" placeholder="请输入充值金额">
				</view>
				<view></view>
			</view>
			<view class="threeItem">
				<view>最后余额</view>
				<view class="orangeColor">{{totalNumber}}</view>
				<view>元</view>
			</view>
		</view>
		
		<button class="submitBtnOrange absoluteBtn" @tap="go">提交充值信息</button>
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
				numbers:"",
				totalNumber:0,
				accountTransactionId:0,//公司虚拟id
				enterpriseId:0,//公司id
				amount:0,
				enterpriseName:"",//公司名称
				authorizedPhone:"",
				id:0,//企业码
				tim:"",//点击提交之后的循环
				rechargeId:0,//充值订单id
				//充值订单按钮
				rechargeBlean:true
			}
		},
		components:{
			headerNav
		},
		onLoad(option){
			
				
			console.log(option)
			if(option.id){
				this.id = option.id
				// infoById_url
				ajax.get(config.infoById_url,{
				  enterpriseCode:this.id
				}).then(res => {
				  console.log(res)
				  if(res.code == 0){
					  this.accountTransactionId = res.data.accountId
					  this.enterpriseName = res.data.enterpriseName
					  this.authorizedPhone = res.data.authorizedPhone
					  this.enterpriseId = res.data.id
					  if(res.data.amount == null){
						  this.amount = 0
						  this.totalNumber = 0
					  }else{
						  this.amount = res.data.amount/100
						  this.totalNumber = res.data.amount/100
					  }
				  }
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
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
			go(){
				if(this.numbers == "" || this.numbers == 0){
					uni.showToast({ title: "充值金额不能为空",icon: "none",duration:2000 });
				}else if(this.numbers < 100){
					uni.showToast({ title: "充值金额小于100",icon: "none",duration:2000 });
				}else if(this.numbers.indexOf(".") != -1){
					uni.showToast({ title: "充值金额不能为小数",icon: "none",duration:2000 });
				}else if(this.numbers < 0){
					uni.showToast({ title: "充值金额不能为负数",icon: "none",duration:2000 });
				}else{
					if(this.numbers >= 9999){
						uni.showToast({ title: "本次充值金额最多九百九十九元",icon: "none",duration:2000 });
						return
					}
					if(this.totalNumber > 99999){
						uni.showToast({ title: "企业余额最多九万九千多元",icon: "none",duration:2000 });
						return
					}
					if(!this.rechargeBlean){
						uni.showToast({ title: "上一个订单还在生成中",icon: "none",duration:2000 });
						return
					}
					uni.showLoading({
						title:"提交中..."
					})
					// uni.hideLoading()
					this.rechargeBlean = false //禁止用户重复点击充值按钮
					ajax.post(config.Record_url,{
					  accountTransactionId:this.accountTransactionId,
					  beforeAmount:this.amount,
					  amount:this.numbers,
					  authorizedPhone:this.authorizedPhone,
					  enterpriseName:this.enterpriseName,
					  enterpriseId:this.enterpriseId
					}).then(res => {
					  console.log(res)
					  if(res.code == 0){
						  uni.hideLoading()
						  uni.showToast({ title: "提交成功",icon: "success",duration:2000 });
						  
						  this.rechargeId = res.data
						  this.$store.commit("getRechargeId",res.data)
						  this.tim = setInterval(()=>{
						  	ajax.get(config.selectById_url,{
						  	  id:this.rechargeId
						  	}).then(res => {
						  	  console.log(res)
						  	  if(res.code == 0){
								  if(res.data != 0 && res.data != undefined && res.data != null){
									  console.log(res.data.status)
									  if(res.data.status == 0){
										  
									  }else if(res.data.status == 1){
										  this.$store.commit("getRechargeId",0)
										  this.rechargeBlean = true
										  clearInterval(this.tim)
										  uni.redirectTo({
											url: '/pages/annal/RechargeOrderList/RechargeOrderList?rechargeId='+this.rechargeId,
										  });
									  }else if(res.data.status == 2){
										  this.$store.commit("getRechargeId",0)
										  this.rechargeBlean = true
										  clearInterval(this.tim)
										  uni.showToast({ title: "本次订单已经被拒绝,请重新选择充值金额",icon: "none",duration:2000 });
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
					
				}
			},
			numberBlur(){
				let that = this
				if(that.numbers != ""){
					if(that.numbers >= 9999){
						uni.showToast({ title: "本次充值金额最多九百九十九元",icon: "none",duration:2000 });
					}else if(that.numbers < 100){
						uni.showToast({ title: "充值金额小于100",icon: "none",duration:2000 });
					}else if(that.numbers.indexOf(".") != -1){
						uni.showToast({ title: "充值金额不能为小数",icon: "none",duration:2000 });
					}else{
						that.totalNumber=(Number(that.amount) + Number(that.numbers)).toFixed(2)
						if(that.totalNumber > 99999){
							uni.showToast({ title: "企业余额最多九万九千多元",icon: "none",duration:2000 });
						}
					}
				}else{
					that.totalNumber=Number(that.amount)
				}
			}
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
	.page .marginTop{
		margin-top: 160upx!important;
		padding-top: 0!important;
	}
	
</style>
