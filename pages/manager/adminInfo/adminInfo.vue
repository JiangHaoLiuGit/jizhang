<template>
	<view>
		<header-nav :isBack="true" title="加油员详情" v-if="headerBlean" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<header-nav :isBack="true" title="加油员详情" :position="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor"></view>
		</header-nav>
		<view class="view" style="margin-top: 40upx;">
			<view class="twoItem">
				<view>姓名</view>
				<view>{{name}}</view>
			</view>
			<view class="twoItem">
				<view>身份证号码</view>
				<view>{{card}}</view>
			</view>
			<view class="twoItem">
				<view>手机号码</view>
				<view>{{phone}}</view>
			</view>
			<view class="twoItem">
				<view>隶属站点</view>
				<view>{{energyGasStationName}}</view>
			</view>
			<view class="twoItem">
				<view>当前状态</view>
				<view v-if="gasStationPersonnelState == 1">启用</view>
				<view v-if="gasStationPersonnelState == 2">禁用</view>
			</view>
			<view class="twoItem">
				<view>附件</view>
				<view></view>
			</view>
			<view class="userImg">
				<view class="imgView" @click="imgBlock">
					<view class="img">
						<image :src="imgSrc" mode="aspectFit"></image>
					</view>
					<text>驾驶员身份证</text>
				</view>
			</view>
		</view>
		<view class="view">
			<view class="twoItem">
				<view>创建时间</view>
				<view>{{createDate}}</view>
			</view>
			<view class="twoItem">
				<view>创建人</view>
				<view>{{createName}}</view>
			</view>
			
		</view>
		<button class="submitBtnGray" @click="goBack">返回</button>
		<view class="imgBlock content" v-show="imgBlean" @click="imgBlock">
			<image :src="imgSrc" mode="aspectFit"></image>
		</view>
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
				itemId:1,
				imgBlean:false,
				imgSrc:"../../../static/my.jpg",
				phone:"",
				name:"",
				card:"",
				energyGasStationName:"",
				gasStationPersonnelState:"",
				createDate:"",
				createName:""
			}
		},
		components:{
			headerNav
		},
		onLoad(option){
			console.log(option)
			if(option.phone){
				this.phone = option.phone
				ajax.get(config.fuelSelect_url,{
					params:this.phone
				}).then(res => {
				  console.log(res)
				  if(res.code == 0){
					  res.data = res.data[0]
					  //name card phone energyGasStationName gasStationPersonnelState imgSrc(cardUrl) createDate
					  this.name = res.data.name
					  this.card = res.data.card
					  this.energyGasStationName = res.data.energyGasStationName
					  this.gasStationPersonnelState = res.data.gasStationPersonnelState
					  if(res.data.createName){
						  this.createName = res.data.createName
					  }else{
						  this.createName = "张程虎"
					  }
					  this.imgSrc = res.data.cardUrl
					  if(res.data.createDate != ""){
						  let value = res.data.createDate
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
						  this.createDate =  y + '/' + MM + '/' + d + ' ' + h + ":" + m + ":" + s;
					  }else{
						  this.createDate = this.$myDateNow
					  }
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
			imgBlock(){
				this.imgBlean = !this.imgBlean
			}
		},
	}
	
</script>

<style>
	
	.imgBlock{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		z-index: 101;
		background-color: rgba(0,0,0,.5);
	}
	.imgBlock image{
		max-width: 600upx;
		max-height: 80vh;
		height: inherit;
		width: inherit;
	}
	.view .userImg{
		height: 228upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}
	.view .userImg .imgView{
		width: 160upx;
		
	}
	.view .userImg .imgView .img{
		width: 160upx;
		height: 160upx;
		background-color: #E2E2E2;
		border-radius: 8upx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 13upx;
	}
	.view .userImg .imgView .img image{
		max-width: 134upx;
		max-height: 134upx;
		/* width: auto; */
		/* height: auto; */
	}
	.view .userImg .imgView text{
		color: #666666;
		font-size: 24upx;
		line-height: 32upx;
	}
	.view{
		padding-left: 0;
		padding-right: 0;
		margin-top: 20upx;
	}
	.submitBtnGray{
		margin-top: 100upx;
	}
	
</style>
