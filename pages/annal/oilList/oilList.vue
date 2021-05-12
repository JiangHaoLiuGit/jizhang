<template>
	<view>
		<header-nav :isBack="true" title="加油流水清单" v-if="headerBlean" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor">
				<veiw class="shai" v-if="status == 1" @click="toggleRightPopup">
					筛选
				</veiw>
			</view>
		</header-nav>
		<header-nav :isBack="true" title="加油流水清单" :position="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor">
				<veiw class="shai" v-if="status == 1" @click="toggleRightPopup">
					筛选
				</veiw>
			</view>
		</header-nav>
		<view class="paddingLeftRight">
			
			<view class="items borderRadius boxShadowSecond" v-for="(item , index) in items" :data-index="item.id" :key="index" @tap="href(item.viceId,item.numberType)">
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
									<image src="../../../static/pic36.png" mode="" v-if="item.preferentialGradeId == 1" style="width: 42upx;height: 39upx;"></image>
									<image src="../../../static/pic35.png" mode="" v-else-if="item.preferentialGradeId == 2" style="width: 42upx;height: 39upx;"></image>
									<image src="../../../static/pic12.png" mode="" v-else-if="item.preferentialGradeId == 3" style="width: 42upx;height: 39upx;"></image>
									<image src="../../../static/pic37.png" mode="" v-else-if="item.preferentialGradeId == 4" style="width: 42upx;height: 39upx;"></image>
									<image src="../../../static/pic38.png" mode="" v-else-if="item.preferentialGradeId == 5" style="width: 42upx;height: 39upx;"></image>
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
							<view class="infoBottom" >
								<view class="first sixColor" v-if="status == 1">
									加油员：{{item.gasStationPersonnelName}}  
								</view>
							</view>
						</view>
						<view class="consume">
							<view class="number">{{item.actualReceivable}}</view>
							<view class="yuan smallText sixColor">元</view>
						</view>
					</view>
			</view>
			<view class="viewBottom" v-show="viewBottom">没有数据了!</view>
		</view>
		<!-- 抽屉 -->
		<uni-drawer class="" ref="popup" mode="right">
		    <view class="drawer">
				
				<text class="smallText threeColor" style="margin-bottom: 22upx;display: block;">关键词查询</text>
				<input type="text" class="input" v-model="nameTitle" placeholder="请输入企业名称/加油员姓名" placeholder-style="color:#999999;font-size:28upx;">
				<view class="oilView">
					<text>油号</text>
					<view class="oilType">
						<view class="active">0# 柴油</view>
					</view>
				</view>
				<view class="oilView">
					<text>价格区间(元)</text>
					<view class="oilPirce spaceBetween">
						<input type="number" v-model="name1" placeholder-style="color:#999999;font-size:24upx;" placeholder="最低价">
						<s></s>
						<input type="number" v-model="name2" placeholder-style="color:#999999;font-size:24upx;" placeholder="最高价">
					</view>
				</view>
				
				<view class="oilView">
					<text>时间区间</text>
					<view class="oilPirce spaceBetween">
						<input type="text" @click="open" v-model="name3" placeholder-style="color:#999999;font-size:24upx;" placeholder="开始时间">
						<s></s>
						<input type="text" @click="open" v-model="name4" placeholder-style="color:#999999;font-size:24upx;" placeholder="结束时间">
					</view>
				</view>
				<view class="botton">
					<view class="reset" @click="reset">重置</view>
					<view class="inquire" @click="inquire">查询</view>
				</view>
		    </view>
			
		</uni-drawer>
		 <uni-calendar ref="calendar" :clear-date="true" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate"
		  :endDate="info.endDate" :range="info.range" @confirm="confirm"/>
	</view>
	
</template>

<script>
	import config from '../../../service/config.js'
	import ajax from '../../../service/ajax.js'
	import headerNav from '../../../components/headerNav/headerNav.vue'
	import uniDrawer from "@/components/uniUi/uni-drawer/uni-drawer.vue"
	import uniCalendar from '@/components/uniUi/uni-calendar/uni-calendar.vue'
	export default{
		components:{
			headerNav,
			uniDrawer,
			uniCalendar
		},
		data(){
			return {
				headerBlean:false,
				//日历弹窗的参数
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				nameTitle:"",
				name1:"",
				name2:"",
				name3:"",
				name4:"",
				items:[
					
				],
				shanxuan:false,
				status:0,
				pageIndex:1,
				//如果没有数据了就是这个
				viewBottom:false,
				//1代表普通搜索,2是简单搜索
				seachType:1,
			}
		},
		
		onLoad(option){
			if(option.status == "1"){
				console.log(option.status)
				this.status = 1
			}
			this.getnewsList()
			
		},
		// 监听触底
		onReachBottom() {
			if(!this.viewBottom){
				this.getnewsList();
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
			goBack:function(e) {
	            uni.navigateBack()
	        },
			href:function(e,type){
				uni.navigateTo({
					url: '/pages/annal/oilItem/oilItem?itemId=' + e+"&&type=" + type,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toggleRightPopup(){
				this.$refs.popup.open()
			},
			inquire(){
				console.log(this.nameTitle)
				console.log(this.name1)
				console.log(this.name2)
				console.log(this.name3)
				console.log(this.name4)
				//更新筛选信息
				this.viewBottom = false
				this.seachType = 2
				this.items = []
				this.pageIndex = 1
				this.getnewsList()
			},
			reset(){
				this.nameTitle=""
				this.name1=""
				this.name2=""
				this.name3=""
				this.name4=""
			},
			confirm(e){
				console.log(e)
				this.name3 = e.range.data[0]
				this.name4 = e.range.data[e.range.data.length-1]
				this.name3 = e.range.data[0]
				
			},
			open(){
				this.$refs.calendar.open();
			},
			getnewsList() {	
				if(this.seachType == 1){
					// 交易流水列表
					ajax.get(config.selectList_url,{
					  type:1,
					  pageIndex:this.pageIndex,
					  transactionType:2,
					  stationId:this.$store.state.stationId
					}).then(res => {
						console.log("加油流水列表")
						console.log(res)
						if(res.code == 0){
							if(res.data == null){
								this.viewBottom = true
								return
							}
							this.pageIndex ++
							let arr = res.data
							for(let i = 0 ; i < arr.length ; i ++){
								let value = arr[i].createDate
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
								arr[i].createDate =  y + '/' + MM + '/' + d + ' ' + h + ":" + m + ":" + s;
							}
							this.items = this.items.concat(arr)
						}
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}
				else if(this.seachType == 2){
					let name3 = this.name3
					let name4 = this.name4
					if(name3 != ""){
						name3 = name3 + " 00:00:00"
					}
					if(name4 != ""){
						name4 = name4 + " 23:59:59"
					}
					// 交易流水筛选列表
					ajax.get(config.selectList_url,{
						type:1,
						pageIndex:this.pageIndex,
						transactionType:2,
						stationId:this.$store.state.stationId,
						params:this.nameTitle,
						sPrice:this.name1,
						ePrice:this.name2,
						startDate:name3,
						endDate:name4,
					}).then(res => {
						console.log("加油流水筛选结果")
						console.log(res)
						if(res.code == 0){
							//这个参数代表以后下拉都是筛选
							if(res.data == null){
								this.viewBottom = true
								return
							}
							this.pageIndex ++
							let arr = res.data
							for(let i = 0 ; i < arr.length ; i ++){
								let value = arr[i].createDate
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
								arr[i].createDate =  y + '/' + MM + '/' + d + ' ' + h + ":" + m + ":" + s;
							}
							this.items = this.items.concat(arr)
							this.$refs.popup.close()
						}
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
					
				}
			}
		}
	}
</script>
	
<style>
	.viewBottom{
		color: #949494;
		text-align: center;
		font-size: 30upx;
		margin: 20upx;
	}
	.drawer{
		padding: 72upx 22upx 0 20upx;
		position: relative;
		height: 100vh;
	}
	.drawer>.input{
		width: 100%;
		height: 80upx;
		border: 2upx solid #E3E3E3;
		margin-bottom: 22upx;
		padding-left: 24upx;
		border-radius: 8upx;
	}
	.drawer .oilView{
		border-top: 2upx solid #E3E3E3;
	}
	.drawer .oilView text{
		display: block;
		margin: 34upx 0 16upx;
		font-size: 24upx;
		line-height: 32upx;
		
	}
	.drawer .oilView .oilType{
		height: 64upx;
		margin-bottom: 22upx;
	}
	.drawer .oilView .oilType view{
		height: 64upx;
		line-height: 64upx;
		text-align: center;
		width: 120upx;
		background: #E3E3E3;
		color: #333;
		border-radius: 4upx;
		float: left;
		margin-left: 22upx;
		font-size: 26upx;
	}
	.drawer .oilView .oilType view:first-child{
		margin-left: 0;
	}
	.drawer .oilView .oilType view.active{
		background-color: #FD8123;
		color: #fff;
	}
	.drawer .oilView .oilPirce{
		height: 60upx;
		margin-bottom: 22upx;
	}
	.drawer .oilView .oilPirce input{
		width: 240upx;
		height: 60upx;
		background-color: #F0F0F0;
		border-radius: 8upx;
		text-align: center;
	}
	.drawer .oilView .oilPirce s{
		display: block;
		width: 34upx;
		height: 2upx;
		background-color: #E3E3E3;
	}
	.drawer .botton{
		position: absolute;
		bottom: 78upx;
		left: 20upx;
		width: 548upx;
		height: 92upx;
		overflow: hidden;
		border-radius: 46upx;
	}
	.drawer .botton view{
		width: 50%;
		height: 92upx;
		float: left;
		color: #FFFFFF;
		font-size: 36upx;
		line-height: 92upx;
		text-align: center;
		border-radius: none;
	}
	.drawer .botton view.reset{
		background-color: #FDB82B;
	}
	.drawer .botton view.inquire{
		background-color: #FD7D23;
	}
	
</style>
