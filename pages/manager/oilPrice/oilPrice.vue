<template>
	<view>
		<header-nav :isBack="true" title="每日油价管理" :position="true" :paddingBottom="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor">
				<view class="image" @click="openPopup">
					<image src="../../../static/pic14.png"></image>
				</view>
			</view>
		</header-nav>
		<view class="page">
			<view class="oilPrice">
				<view class="rectangle">
					今日油价 <text class="Bar">|</text> <text v-if="oil==1" class="no">未设置</text><text v-else-if="oil==2" class="yes"> {{oilPirceArr[0].name}}原价：{{oilPirceArr[0].cost}}元</text>
				</view>
				<view class="box">
					<view class="boxView" v-if="oil == 2">
						 <!-- v-for="item in oilPirceArr" :key="index" -->
						 <view class="boxItem" v-for="item in oilPirceArr" :key="index">
						 	<view class="first">
						 		<image src="../../../static/pic15.png"></image><text class="number">{{item.clinch}}元</text>
						 	</view>
						 	<view class="second">
						 		{{item.preferentialGradeName}}
						 	</view>
						 </view>
					</view>
					<view class="boxView" v-else-if="oil == 1">
						<view class="viewText sixColor widthB bigText content">
							请点击右上角设置今日油价
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="calendar paddingLeftRight">
			<uni-collapse accordion="true" @change="change">
				
			    <uni-collapse-item v-for="(item,index) in dayArr" :key="index" :open="index == 0" @click="editDay(item.year,item.month)" :title="index == 0 ?'本月'+item.month+'月':item.year + item.month + '月'">
			        <view class="viewDay" v-for="(items,indexs) in item.day" :key="indexs">
						<view class="top">
							<view class="left content" v-if="items.num == 3">
								{{items.week}} {{item.month}}-{{items.dayNum}}
							</view>
							<view class="left content" v-else>
								{{items.week}} {{item.month}}-{{items.dayNum}}
							</view>
							<view class="right" v-if="items.oil">
								{{items.oil[0].name}} 原价：{{items.oil[0].cost}}元
							</view>
							<view class="right" v-else>
								油名称 原价：未设置
							</view>
						</view>
						<view class="bottom spaceAround" v-if="items.oil && items.oil.length != 0">
							<view class="boxContent">
								<view class="left content">一</view>
								<view class="right content">5.77元</view>
							</view>
							<view class="boxContent">
								<view class="left content">二</view>
								<view class="right content">5.66元</view>
							</view>
							<view class="boxContent">
								<view class="left content">三</view>
								<view class="right content">5.55元</view>
							</view>
							<view class="boxContent">
								<view class="left content">四</view>
								<view class="right content">5.44元</view>
							</view>
						</view>
						<view class="bottom spaceAround" v-else>
							<view class="boxContent">
								<view class="left content">一</view>
								<view class="right content">未设置</view>
							</view>
							<view class="boxContent">
								<view class="left content">二</view>
								<view class="right content">未设置</view>
							</view>
							<view class="boxContent">
								<view class="left content">三</view>
								<view class="right content">未设置</view>
							</view>
							<view class="boxContent">
								<view class="left content">四</view>
								<view class="right content">未设置</view>
							</view>
						</view>
					</view>
			    </uni-collapse-item>
			    <!-- <uni-collapse-item showAnimation="true" title="标题文字"></uni-collapse-item> -->
			</uni-collapse>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popBottom">
				<view class="top">
					油价设置
				</view>
				<view class="formSelect">
					<text>生效时间</text>
					<view class="viewSelect spaceBetween">
						<view :class="item.selects ? 'select content active' : 'select content'" v-for="(item,index) in select" :key="item.id" @click="selectActive(index,item)">
							{{item.name}}
							<view class="icon content"><image src="../../../static/pic30.png" mode=""></image></view>
						</view>
					</view>
				</view>
				<view class="formContent">
				  <text>0#柴油原价</text>
				  <input type="number" :value="name" v-model="name" name="name" placeholder="请输入原价" class="text"/>
				</view>
				<view class="formContent">
				  <text>0#柴油一级会员价</text>
				  <view class="input">
					  <input type="number" v-model="name1" name="name1" @input="onInputName1" placeholder="一级会员优惠价" class="text"/>
					  <text>或</text>
					  <input type="number" v-model="name11" name="name11"  @input="onInputName11" placeholder="一级会员折扣" class="text"/>
				  </view>
				  
				</view>
				<view class="formContent">
				  <text>0#柴油二级会员价</text>
				  <view class="input">
					  <input type="number" v-model="name2" name="name2" @input="onInputName2" placeholder="二级会员优惠价" class="text"/>
					  <text>或</text>
					  <input type="number" v-model="name22" name="name22" @input="onInputName22" placeholder="二级会员折扣" class="text"/>
				  </view>
				  
				</view>
				<view class="formContent">
				  <text>0#柴油三级会员价</text>
				  <view class="input">
						<input type="number" v-model="name3" name="name3" @input="onInputName3" placeholder="三级会员优惠价" class="text"/>
						<text>或</text>
						<input type="number" v-model="name33" name="name33" @input="onInputName33" placeholder="三级会员折扣" class="text"/>
				  </view>
				</view>
				<view class="formContent">
				  <text>0#柴油四级会员价</text>
				  <view class="input">
						<input type="number" v-model="name4" name="name4" @input="onInputName4" placeholder="四级会员优惠价" class="text"/>
						<text>或</text>
						<input type="number" v-model="name44" name="name44" @input="onInputName44" placeholder="四级会员折扣" class="text"/>
				  </view>
				  
				</view>
				<button class="submitBtnyello" @click="go">确认提交</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import config from '../../../service/config.js'
	import ajax from '../../../service/ajax.js'
	import headerNav from '../../../components/headerNav/headerNav.vue'
	import uniCollapse from '@/components/uniUi/uni-collapse/uni-collapse.vue'//显示隐藏列表父级
	import uniCollapseItem from '@/components/uniUi/uni-collapse-item/uni-collapse-item.vue'//显示隐藏列表子级
	import uniPopup from '@/components/uniUi/uni-popup/uni-popup.vue'//下面弹出窗口
	export default{
		data(){
			return {
				headerBlean:false,
				itemId:1,
				oil:1,//为没有设置过今日油价的.2是设置过的
				month_olypic:[31,29,31,30,31,30,31,31,30,31,30,31],//闰年每个月份的天数
				month_normal:[31,28,31,30,31,30,31,31,30,31,30,31],
				month_name:["1月", "2月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				myData:"",
				myYear:"",//获取年份
				myMonth:"",//获取月份,一月份的下标为0
				myDay:"",//获取当前日期
				week:['周日','周一','周二','周三','周四','周五','周六'],
				dayArr:[],//前10个月的数据
				yearNum:10,//规定10个月的数据
				name:"",//原价
				name1:"",//一级会员优惠价
				name11:"",//一级会员折扣
				name2:"",//二级会员优惠价
				name22:"",//二级会员折扣
				name3:"",//三级会员优惠价
				name33:"",//三级会员折扣
				name4:"",//四级会员优惠价
				name44:"",//四级会员折扣
				select:[
					{
						name:"次日生效",
						id:"1",
						selects:true
					},{
						name:"当日生效",
						id:"2",
						selects:false
					}
				],
				oilType:1,
				gasStationId:0,
				myDateNow:'',
				oilPirceArr:[]
			}
		},
		components:{
			headerNav,
			uniCollapse,
			uniCollapseItem,
			uniPopup
		},
		onLoad(option){
			this.myData = new Date()
			this.myYear = this.myData.getFullYear();
			this.myMonth = this.myData.getMonth();
			this.myDay = this.myData.getDate();
			let dayArr = [],
				year = this.myYear,
				month = this.myMonth,
				day = this.myDay,
				isWeek = new Date().getDay()
				
			//this.week[this.dayStart(month,year)] 获取月份中第一天是周几
			for(let i = 0 ; i < this.yearNum ; i++){
				var monthArr = {}
				var dayNum = this.daysMonth(month,year)
				var week = this.dayStart(month,year)
				monthArr.year = year + "年"
				monthArr.month = month + 1
				month --
				if(month == -1){
					month = 11
					year--
				}
				monthArr.day = []
				console.log(dayNum)
				//业务逻辑需要.第一个月得特殊处理
				if(i == 0){
					for(let j = 0 ; j < this.myDay - 1 ; j ++){
						var dayObj = {}
						var weeks = this.week[week]
						if(j == this.myDay - 2){
							weeks = "昨天"
						}
						week++
						if(week == 7){
							week = 0
						}
						//week:"",dayNum:""
						dayObj.week = weeks
						if(j < 9){
							dayObj.dayNum = "0" + (j + 1)
						}else{
							dayObj.dayNum = j + 1 + ""
						}
						
						monthArr.day.unshift(dayObj)
					}
				}else{
					for(let j = 0 ; j < dayNum ; j ++){
						var dayObj = {}
						var weeks = this.week[week]
						week++
						if(week == 7){
							week = 0
						}
						//week:"",dayNum:""
						dayObj.week = weeks
						if(j < 9){
							dayObj.dayNum = "0" + (j + 1)
						}else{
							dayObj.dayNum = j + 1 + ""
						}
						monthArr.day.push(dayObj)
					}
				}
				//算出这个月的天数
				dayArr.push(monthArr)
			}
			this.dayArr = dayArr
			
			this.gasStationId = this.$store.state.stationId
			this.myDateNow = this.$myDateNow
			// //交易今日油价
			ajax.get(config.Station_url,{
			  createDate:this.myDateNow,
			  gasStationId:this.gasStationId
			}).then(res => {
				console.log("今日油价")
			  console.log(res)
			  
			  if(res.data.length > 0){
				  this.oil = 2
				  
				  //clinch
				  let arr = res.data
				  for(let i = 0 ; i < arr.length ; i ++){
					  arr[i].clinch = (arr[i].clinch).toFixed(2)
				  }
				  this.oilPirceArr = arr
			  }else{
				  this.oil = 1
			  }
			  
			}).catch(err => {
			  //ajax.js反馈的reject结果
			  console.log(err)
			})
			let data = this.myYear + "-" + (this.myMonth+1)
			console.log(data)
			
			
		},
		onShow(){
			ajax.get(config.forHistory_url,{
				createDate:this.myYear + "-" + (this.myMonth+1),
				gasStationId:1
			}).then(res => {
				console.log("查询当月油价")
				console.log(res)
				if(res.code == 0){
					let oldList = this.dayArr[0]
					let obj = res.data
					for(let key in obj){
						if(obj[key].length!=0){
							console.log(key)
							let day = key.split("-")
							day = day[2]
							for(let i = 0 ; i < oldList.day.length ; i ++){
								console.log(oldList.day[i])
								if(oldList.day[i].dayNum == day){
									oldList.day[i].oil = obj[key]
									console.log(oldList.day[i])
									break;
								}
							}
							console.log(obj[key])
						}
					}
					
					this.dayArr[0].day[0].num = 3
					console.log(this.dayArr[0])
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
		methods:{
			goBack() {
			    uni.navigateBack()
			},
			//输入月,年查询当月第一天周几
			dayStart(month,year){
				var tmpDate = new Date(year, month , 1);
				return (tmpDate.getDay());
			},
			//输入月,年查询当月有多少天
			daysMonth(month,year){
				var tmp1 = year % 4;
				var tmp2 = year % 100;
				var tmp3 = year % 400;
				if((tmp1 == 0 && tmp2 != 0) || (tmp3 == 0)){
				    return (this.month_olypic[month]);//闰年
				}else{
				    return (this.month_normal[month]);//非闰年
				}
			},
			openPopup:function(){
				this.$refs.popup.open()
			},
			selectActive(index){
				for(let i = 0 ; i < this.select.length ; i++){
					this.select[i].selects = false
				}
				this.select[index].selects = true
				this.oilType = this.select[index].id
				console.log(this.oilType)
				//查询当前点中的日期
				ajax.get(config.forHistory_url,{
					createDate:"2020-9",
					gasStationId:1
				}).then(res => {
					console.log("查询09油价")
					console.log(res)
					if(res.code == 0){
						
					}
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			},
			editDay(year,month){
				console.log(year)
				console.log(month)
			},
			change(activeNames){
				console.log(activeNames)
				if(activeNames.length == 1){
					console.log("此时下标是index:" + activeNames[0])
					console.log(this.dayArr[activeNames[0]])
					let oldList = this.dayArr[activeNames[0]]
					let date = parseInt(this.dayArr[activeNames[0]].year) + "-" + this.dayArr[activeNames[0]].month
					console.log("传递参数:"+date)
					ajax.get(config.forHistory_url,{
						createDate:date,
						gasStationId:1
					}).then(res => {
						console.log("查询当月油价")
						console.log(res)
						if(res.code == 0){
							let obj = res.data
							for(let key in obj){
								if(obj[key].length!=0){
									console.log(key)
									let day = key.split("-")
									day = day[2]
									for(let i = 0 ; i < oldList.day.length ; i ++){
										console.log(oldList.day[i])
										if(oldList.day[i].dayNum == day){
											oldList.day[i].oil = obj[key]
											console.log(oldList.day[i])
											break;
										}
									}
									console.log(obj[key])
								}
							}
						}
						
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
					
				}
				
			},
			go(){
				
				if(this.name == ""){
					uni.showToast({title:"原价必填",icon: "none",duration:2000})
					return
				}
				if(this.name1 == "" && this.name11 == ""){
					uni.showToast({title:"一级会员价必填",icon: "none",duration:2000})
					return
				}
				if(this.name2 == "" && this.name22 == ""){
					uni.showToast({title:"二级会员价必填",icon: "none",duration:2000})
					return
				}
				if(this.name3 == "" && this.name33 == ""){
					uni.showToast({title:"三级会员价必填",icon: "none",duration:2000})
					return
				}
				if(this.name4 == "" && this.name44 == ""){
					uni.showToast({title:"四级会员价必填",icon: "none",duration:2000})
					return
				}
				if(parseInt(this.name) > 99){
					uni.showToast({title:"原价最大九十九元",icon: "none",duration:2000})
					return
				}
				if(parseInt(this.name11) > 10 || parseInt(this.name22) > 10 || parseInt(this.name33) > 10 || parseInt(this.name44) > 10){
					uni.showToast({title:"折扣最大是十",icon: "none",duration:2000})
					return
				}
				console.log(parseInt(this.name1) > parseInt(this.name))
				if(parseInt(this.name1) > parseInt(this.name)){
					uni.showToast({title:"一级会员价不能大于原价",icon: "none",duration:2000})
					return
				}
				if(parseInt(this.name2) > parseInt(this.name)){
					uni.showToast({title:"二级会员价不能大于原价",icon: "none",duration:2000})
					return
				}
				if(parseInt(this.name3) > parseInt(this.name)){
					uni.showToast({title:"三级会员价不能大于原价",icon: "none",duration:2000})
					return
				}
				if(parseInt(this.name4) > parseInt(this.name)){
					uni.showToast({title:"四级会员价不能大于原价",icon: "none",duration:2000})
					return
				}
				let name1,
					name2,
					name3,
					name4;
				if(this.name1 == ""){
					name1 = (this.name11/1).toFixed(2)
				}else{
					name1 = (this.name1/this.name*10).toFixed(2)
				}
				if(this.name2 == ""){
					name2 = (this.name22/1).toFixed(2)
				}else{
					name2 = (this.name2/this.name*10).toFixed(2)
				}
				if(this.name3 == ""){
					name3 = (this.name33/1).toFixed(2)
				}else{
					name3 = (this.name3/this.name*10).toFixed(2)
				}
				if(this.name4 == ""){
					name4 = (this.name44/1).toFixed(2)
				}else{
					name4 = (this.name4/this.name*10).toFixed(2)
				}
				let arr = [
					{
						preferentialGradeId:1,
						discount:name1
					},
					{
						preferentialGradeId:2,
						discount:name2
					},
					{
						preferentialGradeId:3,
						discount:name3
					},
					{
						preferentialGradeId:4,
						discount:name4
					}
				]
				arr = JSON.stringify(arr)
				console.log(arr)
				uni.showLoading({
					title:"加载中..."
				})
				ajax.post(config.oilToday_url,{
					gasStationId:1,
					name:"0#柴油",
					amount:this.name,
					str:arr,
					type:this.oilType,
				}).then(res => {
					console.log("设置今日油价")
					console.log(res)
					if(res.code == 0){
						uni.hideLoading()
						this.$refs.popup.close()
						uni.showToast({title:"设置油价成功",icon: "success",duration:2000})
						
						
						if(this.oilType == 2){
							// //交易今日油价
							ajax.get(config.Station_url,{
							  createDate:this.myDateNow,
							  gasStationId:this.gasStationId
							}).then(res => {
								console.log("今日油价")
							  console.log(res)
							  if(res.data.length > 0){
								  this.oil = 2
								  
								  //clinch
								  let arr = res.data
								  for(let i = 0 ; i < arr.length ; i ++){
									  arr[i].clinch = (arr[i].clinch).toFixed(2)
								  }
								  this.oilPirceArr = arr
							  }else{
								  this.oil = 1
							  }
							  
							}).catch(err => {
							  //ajax.js反馈的reject结果
							  console.log(err)
							})
						}
						//清空表单数据
						for(let i = 0 ; i < this.select.length ; i++){
							this.select[i].selects = false
						}
						this.select[0].selects = true
						this.oilType = 1
						this.name = ""
						this.name1 = ""
						this.name11 = ""
						this.name2 = ""
						this.name22 = ""
						this.name3 = ""
						this.name33 = ""
						this.name4 = ""
						this.name44 = ""
					}
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			},
			onInputName1(){
				if(this.name11 != ""){
					this.name11 = ""
				}
			},
			onInputName11(){
				if(this.name1 != ""){
					this.name1 = ""
				}
			},onInputName2(){
				if(this.name22 != ""){
					this.name22 = ""
				}
			},
			onInputName22(){
				if(this.name2 != ""){
					this.name2 = ""
				}
			},onInputName3(){
				if(this.name33 != ""){
					this.name33 = ""
				}
			},
			onInputName33(){
				if(this.name3 != ""){
					this.name3 = ""
				}
			},onInputName4(){
				if(this.name44 != ""){
					this.name44 = ""
				}
			},
			onInputName44(){
				if(this.name4 != ""){
					this.name4 = ""
				}
			}
		}
	}
</script>

<style>
	
	.formContent .input{
		display: flex;
		justify-content:space-between;
		align-items:center;
	}
	.formContent .input input{
		width: 312upx;
	}
	.formContent .input text{
		font-size: 32upx;
		margin-top: 10upx;
	}
	.popBottom{
		width: 100%;
		background-color: #fff;
		border-top-left-radius: 40upx;
		border-top-right-radius: 40upx;
		padding: 0 30upx;
		display: flow-root;
	}
	.popBottom .top{
		padding: 18upx 0 20upx;
		font-size: 36upx;
		line-height: 48upx;
		color: #FD8023;
		width: 100%;
		text-align: center;
		border-bottom: 2upx solid #E3E3E3;
	}
	.calendar{
		margin-top: 40upx;
		margin-bottom: 50upx;
	}
	.calendar .viewDay{
		background: #fff;
		border-radius: 8upx;
		margin: 10upx 0 20upx;
		box-shadow: 0 6upx 6upx rgba(0,0,0,.06);
	}
	.calendar .viewDay .top{
		height: 60upx;
		border-bottom: 2upx solid #F4F4F4;
	}
	.calendar .viewDay .top .left{
		width:150upx;
		height: 60upx;
		background-color: #FD7F23;
		color: #FFF;
		font-size: 24upx;
		line-height: 32upx;
		border-top-left-radius: 8upx;
		border-top-right-radius: 30upx;
		border-bottom-right-radius: 30upx;
	}
	.calendar .viewDay .top .right{
		font-size: 24upx;
		line-height: 32upx;
		padding: 14upx 26upx 0 0;
	}
	.calendar .viewDay .bottom{
		height: 90upx;
		width: 100%;
		padding: 0 4upx;
	}
	.calendar .viewDay .bottom .boxContent{
		height: 60upx;
		width: 158upx;
	}
	.calendar .viewDay .bottom .boxContent .left{
		height: 58upx;
		width: 60upx;
		background: #ddd;
		color: #666;
		font-size: 24upx;
		box-shadow:0 2upx 0 rgba(0,0,0,.15);
		border-radius: 8upx;
	}
	.calendar .viewDay .bottom .boxContent .right{
		height: 60upx;
		width: 96upx;
		background: #f0f0f0;
		color: #FD7F23;
		font-size: 24upx;
		box-shadow:0 2upx 0 rgba(0,0,0,.15);
		border-radius: 8upx;
	}
	.box{
		margin-top: 32upx;
	}
	.box .boxView{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	.box .boxView .boxItem:nth-of-type(1),.box .boxView .boxItem:nth-of-type(2){
		margin-bottom: 40upx;
	}
	.box .boxItem{
		width: 280upx;
		height: 130upx;
		background: url(../../../static/pic28.png)no-repeat;
		background-size: cover;
	}
	.box .boxItem .first{
		display: flex;
		justify-content: center;
		padding-top: 6px;
	}
	.box .boxItem .first image{
		width: 20upx;
		height: 20upx;
		margin-top: 22upx;
		margin-right: 8upx;
	}
	.box .boxItem .first text{
		color: #FD0D1B;
		font-size: 40upx;
		line-height: 54upx;
	}
	.box .boxItem .second{
		color: #FD8724;
		font-size: 28upx;
		line-height: 38upx;
		margin-top: 18upx;
		text-align: center;
	}
	.Bar{
		padding-left: 10upx;
		position: relative;
		bottom: 2upx;
	}
	.page{
		padding: 0 30upx 0;
		
	}
	.no,.yes{
		padding-left: 10upx;
	}
	.oilPrice{
		padding: 0 46upx 34upx;
		border-radius: 20upx;
		background: linear-gradient(129deg,#FAF9E7 0% , #FFFBD9 100%);
		box-shadow:0upx 6upx 6upx rgba(0,0,0,.06);
		margin-top: -50upx;
		display: flow-root;
	}
	.oilPrice .rectangle{
		width: 100%;
		height: 86upx;
		background: url(../../../static/pic29.png)no-repeat;
		background-color: #FFCE00;
		padding-top:20upx;
		text-align: center;
		font-size: 32upx;
		line-height: 42upx;
		color: #333;
		margin-top: -38upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}
	.no{
		color: #FD1120;
	}
	.uni-collapse,.uni-collapse-cell--open{
		background-color: #f4f4f4;
	}
	.uni-collapse-cell{
		/* border: none; */
		/* border-bottom: 2upx solid #E2E2E2; */
	}
	
</style>
