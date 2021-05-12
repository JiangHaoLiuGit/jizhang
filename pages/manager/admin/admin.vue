<template>
	<view>
		<header-nav :isBack="true" title="加油员管理" v-if="headerBlean" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor">
				<view class="image" @click="openPopup">
					<image src="../../../static/pic14.png"></image>
				</view>
			</view>
		</header-nav>
		<header-nav :isBack="true" title="加油员管理" :position="true" titleTintColor="#fff" :center="true" :bgColor="{'background-image': 'linear-gradient(to right, #FD8C25 , #FD7F23)'}">
		    <image slot="back" @tap="goBack" class="navImg" src="../../../static/pic13.png"></image>
			<view slot="clickImg" class="navImgThird kong smallText fffColor">
				<view class="image" @click="openPopup">
					<image src="../../../static/pic14.png"></image>
				</view>
			</view>
		</header-nav>
		<view class="adminView">
			<view class="top">
				<view class="left formContent">
					<input type="text" v-model="adminName1" name="adminName1" placeholder-style="font-size:28upx;color:#999;" placeholder="请输入加油员姓名/加油站名称/手机号" class="nameIphone"/>
					<image src="../../../static/pic34.png"  @click="filters"></image>
				</view>
				<view class="right" @click="filter">筛选	</view>
			</view>
			<view class="box">
				<view v-for="(item , index) in adminList" :class="item.gasStationPersonnelState == 2 ? 'boxContent active':'boxContent'" :key="index">
					<uni-swipe-action>
						<uni-swipe-action-item>
							<view class="boxView">
								<view class="info" @click="go2(item.phone)">
									<view class="userImg">
										<image src="../../../static/pic42.png"  v-if="item.gasStationPersonnelState != 2"></image>
										<image src="../../../static/pic47.png" v-else></image>
									</view>
									<view class="userInfo">
										<view class="top">加油员姓名：{{item.name}}</view>
										<view class="bottom">所属油站：{{item.energyGasStationName}}</view>
									</view>
								</view>
								<view class="userEnable" v-html="item.gasStationPersonnelState == 2 ? '已禁用':'已启用'">
									
								</view>
								
							</view>
							<template v-slot:right>
								<view class="type enable" v-if="item.gasStationPersonnelState == 2" @click="qiyong(item.id)">
									<image src="../../../static/pic44.png"></image>
									<text>启用</text>
								</view>
								<view class="type disable" v-else  @click="jinyong(item.id)">
									<image src="../../../static/pic43.png"></image>
									<text>禁用</text>
								</view>
								<view class="type alter" @click="openPopup2(item.id,item.phone)">
									<image src="../../../static/pic46.png"></image>
									<text>修改</text>
								</view>
								<view class="type delete" @click="deletes(item.id)">
									<image src="../../../static/pic45.png"></image>
									<text>删除</text>
								</view>
							</template>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>
			<view class="viewBottom" v-show="viewBottom">没有数据了!</view>
		</view>
		<!-- 新增加油员 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popBottom">
				<view class="top">
					新增加油员
				</view>
				
				<view class="formContent">
				  <text>加油员姓名</text>
				  <input type="text" v-model="adminNameAdd" placeholder-style="font-size:28upx;color:#999;" placeholder="请输入加油员姓名" class="text"/>
				</view>
				<view class="formContent">
				  <text>身份证</text>
				  <input type="idcard" v-model="idCard" placeholder-style="font-size:28upx;color:#999;" placeholder="请输入身份证" class="text"/>
				  <view class="box idCard clearfix">
					  <view class="left">
						<view class="addImg left contenter content" @click="addImg" data-img="shenfen">
						  <image class="clickImg" v-if="shenfen == ''" src="../../../static/pic41.png"></image>
						  <image class="image" v-else  :src="shenfen" mode="aspectFit"></image>
						</view>
						<view class="viewText right">
						  <text class="head" @click="addImg" data-img="shenfen">点击上传 加油员身份证</text>
						  <text class="txt">身份证信息清晰可见</text>
						  <text class="txt">大头像清晰</text>
						</view>
					  </view>
				  </view>
				</view>
				<view class="formContent">
				  <text>手机号码</text>
				  <view class="phoneView clearfix">
					<input type="number" v-model="iPhone1"  placeholder="请输入手机号码" placeholder-style="font-size:28upx;color:#999;" class="text left"/>
					<button class="contenter right" data-name="add" @click="yan">{{yanzhen}}</button>
				  </view>
				  <input type="number" v-model="iPhoneCode1" placeholder-style="font-size:28upx;color:#999;" placeholder="请输入手机验证码" class="text"/>
				</view>
				
				<button class="submitBtnOrange" @click="goAdd">确认提交</button>
			</view>
		</uni-popup>
		
		<!-- 修改加油员 -->
		<uni-popup ref="popup2" type="bottom">
			<view class="popBottom">
				<view class="top">
					修改加油员
				</view>
				
				<view class="formContent">
				  <text>加油员姓名</text>
				  <input type="text" v-model="adminNameEdit" placeholder-style="font-size:28upx;color:#999;" placeholder="请输入加油员姓名" class="text"/>
				</view>
				<view class="formContent">
				  <text>身份证</text>
				  <input type="idcard" v-model="idCardNew" placeholder-style="font-size:28upx;color:#999;" placeholder="请输入身份证" class="text"/>
				  <view class="box idCard clearfix">
					  <view class="left">
						<view class="addImg left contenter content" @click="addImg" data-img="shenfenNew">
						  <image class="clickImg" v-if="shenfenNew == ''" src="../../../static/pic39.png"></image>
						  <image class="image" v-else  :src="shenfenNew"  mode="aspectFit"></image>
						</view>
						<view class="viewText right" style="padding-left: 42upx;">
						  <text class="head" @click="addImg" data-img="shenfenNew">点击重新上传 加油员身份证</text>
						  <text class="txt">身份证信息清晰可见</text>
						  <text class="txt">大头像清晰</text>
						</view>
					  </view>
				  </view>
				</view>
				<view class="formContent">
				  <text>手机号码</text>
				  <view class="phoneView clearfix">
					<input type="number"  placeholder="请输入手机号码" v-model="iPhone2" placeholder-style="font-size:28upx;color:#999;" class="text left"/>
					<button class="contenter right" data-name="edit" @click="yan">{{yanzhen}}</button>
				  </view>
				  <input type="number" v-model="iPhoneCode2" placeholder-style="font-size:28upx;color:#999;" placeholder="请输入手机验证码" class="text"/>
				</view>
				
				<button class="submitBtnOrange" @click="goEdit">确认提交</button>
			</view>
		</uni-popup>
		
		<!-- 抽屉 -->
		<uni-drawer class="" ref="popup3" mode="right">
		    <view class="drawer">
				
				<text class="smallText threeColor" style="margin-bottom: 22upx;display: block;">关键词查询</text>
				<input type="text" class="input" v-model="adminName2" name="adminName2" placeholder="请输入加油员姓名/加油站名称/手机号" placeholder-style="color:#999999;font-size:28upx;">
				<view class="oilView">
					<text>状态</text>
					<view class="enableType spaceBetween">
						<view :class="adminType == 1 ?'enableView active' : 'enableView'" @click="adminTypes" data-index="1">
							启用状态
						</view>
						<view :class="adminType == 2 ?'enableView active' : 'enableView'" @click="adminTypes" data-index="2">
							禁用状态
						</view>
					</view>
				</view>
				<view class="botton">
					<view class="reset" @click="reset">重置</view>
					<view class="inquire" @click="inquire">查询</view>
				</view>
		    </view>
		</uni-drawer>
	</view>
</template>

<script>
	import config from '../../../service/config.js'
	import ajax from '../../../service/ajax.js'
	import uploadImage from '@/common/ossutil/uploadFile.js';
	import headerNav from '../../../components/headerNav/headerNav.vue'
	import uniPopup from '@/components/uniUi/uni-popup/uni-popup.vue'//下面弹出窗口
	import uniSwipeAction from '@/components/uniUi/uni-swipe-action/uni-swipe-action.vue'//下面弹出窗口
	import uniSwipeActionItem from '@/components/uniUi/uni-swipe-action-item/uni-swipe-action-item.vue'//下面弹出窗口
	import uniDrawer from "@/components/uniUi/uni-drawer/uni-drawer.vue"
	import uniCalendar from '@/components/uniUi/uni-calendar/uni-calendar.vue'
	export default{
		data(){
			return {
				headerBlean:false,
				//简单搜索加油员时的参数
				adminName1:"",
				//筛选加油员时名称
				adminName2:"",
				//筛选加油员时的状态 默认1,启用.2为禁用
				adminType:"1",
				yanzhen:"获取验证码",
				//新增
				adminNameAdd:"",
				//新增-手机号
				iPhone1:"",
				//新增-手机验证码
				iPhoneCode1:"",
				shenfen:"",//新增身份证图片路径
				//新增-身份证
				idCard:"",
				
				
				adminNameEdit:"",
				//修改-手机号
				iPhone2:"",
				//修改-手机验证码
				iPhoneCode2:"",
				//修改-身份证
				idCardNew:"",
				//预防用户频繁获取手机验证码按钮
				time:true,
				
				shenfenNew:"",//修改身份证图片路径
				name:"",//原价
				name1:"",//一级会员优惠价
				name2:"",//新增加油员姓名
				name3:"",//修改加油员姓名
				nameTitle:"",//筛选的关键词
				//左侧滑动
				options1: [{
					text: '取消置顶'
				}],
				adminList:[],
				//修改,删除时的加油员id
				adminId:0,
				pageIndex:1,
				pageSize:7,
				viewBottom:false,
				//1代表普通搜索,2是简单搜索,3是复杂搜索
				seachType:1,
			}
		},
		components:{
			headerNav,
			uniPopup,
			uniSwipeAction,
			uniSwipeActionItem,
			uniDrawer,
			uniCalendar
		},
		onLoad(option){
			this.getnewsList()
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
			//上一页
			goBack() {
			    uni.navigateBack()
			},
			//新增加油员弹窗
			openPopup:function(){
				this.$refs.popup.open()
			},
			//修改加油员
			openPopup2(index,phone){
				this.adminId = index
				this.$refs.popup2.open()
				ajax.get(config.fuelSelect_url,{
				  params:phone
				}).then(res => {
				console.log("获取加油员列表")
				  console.log(res)
				  if(res.code == 0){
					  this.adminNameEdit = res.data[0].name
					  this.idCardNew = res.data[0].card
					  this.shenfenNew = res.data[0].cardUrl
					  this.iPhone2 = res.data[0].phone
				  }
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			},
			//启用加油员
			qiyong(index){
				// this.adminList[index].type = 1
				ajax.post(config.losuSelect_url,{
				  id:index,
				  gasStationPersonnelState:1
				}).then(res => {
				  if(res.code == 0){
					  
					  uni.showToast({title:"启用成功",icon: "success",duration:2000})
					  this.$refs.popup.close()
					  
					  //重新加载数据
					  ajax.get(config.fuelSelect_url,{
					    // params:"萧山市北路加油站"
					  }).then(res => {
					  console.log("获取加油员列表")
					    console.log(res)
					    if(res.code == 0){
					  	  this.adminList = res.data
					  	  
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
			//禁用加油员
			jinyong(index){
				// this.adminList[index].type = 1
				ajax.post(config.losuSelect_url,{
				  id:index,
				  gasStationPersonnelState:2
				}).then(res => {
					console.log(res)
				  if(res.code == 0){
					  
					  uni.showToast({title:"禁用成功",icon: "success",duration:2000})
					  this.$refs.popup.close()
					  
					  //重新加载数据
					  ajax.get(config.fuelSelect_url,{
					    // params:"萧山市北路加油站"
					  }).then(res => {
					  console.log("获取加油员列表")
					    console.log(res)
					    if(res.code == 0){
					  	  this.adminList = res.data
					  	  
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
			//删除加油员
			deletes(index){
				// ajax.post(config.losuSelect_url,{
				//   id:this.id,
				//   gasStationPersonnelState:1
				// }).then(res => {
				//   if(res.code == 0){
					  
				// 	  uni.showToast({title:"禁用成功",icon: "success",duration:2000})
				// 	  this.$refs.popup.close()
					  
				// 	  //重新加载数据
				// 	  ajax.get(config.fuelSelect_url,{
				// 	    // params:"萧山市北路加油站"
				// 	  }).then(res => {
				// 	  console.log("获取加油员列表")
				// 	    console.log(res)
				// 	    if(res.code == 0){
				// 	  	  this.adminList = res.data
					  	  
				// 	    }
				// 	  }).catch(err => {
				// 	    //ajax.js反馈的reject结果
				// 	    console.log(err)
				// 	  })
				//   }
				// }).catch(err => {
				//   //ajax.js反馈的reject结果
				//   console.log(err)
				// })
			},
			filters(){
				//更新筛选信息
				this.viewBottom = false
				this.seachType = 2
				this.adminList = []
				this.pageIndex = 1
				this.getnewsList()
				
			},
			//筛选查询
			filter(){
				this.$refs.popup3.open()
				
			},
			//提交新增驾驶员
			goAdd(){
				if(this.adminNameAdd == ""){
					uni.showToast({title:"加油员姓名必填",icon: "none",duration:2000})
					return
				}
				if(this.adminNameAdd.length >= 6){
					uni.showToast({title:"加油员姓名请控制到1-5位之间",icon: "none",duration:2000})
					return false
				}
				if(!this.chinese(this.adminNameAdd,"加油员姓名")){
				  return false
				}
				//身份证验证
				var regId = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
				if(this.idCard == ""){
					uni.showToast({title:"身份证号码必填",icon: "none",duration:2000})
					return
				}else if (!this.idCard.match(regId)) {
					uni.showToast({title:"身份证号格式错误",icon: "none",duration:2000})
				  return
				}
				
				if(this.shenfen == ""){
					uni.showToast({title:"加油员身份证必须上传",icon: "none",duration:2000})
					return
				}
				if(this.iPhone1 == ""){
					uni.showToast({title:"手机号必填",image:"/static/erreo.png",icon: "none",duration:2000})
					return
				}
				if(this.phoneRlus(this.iPhone1) == false){
				  return false
				}
				if(this.iPhoneCode1 == ""){
					uni.showToast({title:"手机验证码必填",icon: "none",duration:2000})
					return
				}
				console.log("新增提交")
				//saveSelect_url
				ajax.post(config.saveSelect_url,{
				  energyGasStationId:1,
				  name:this.adminNameAdd,
				  phone:this.iPhone1,
				  card:this.idCard,
				  cardUrl:this.shenfen
				}).then(res => {
					console.log("新增加油员")
					console.log(res)
					if(res.code == 0){
						uni.showToast({title:"新增成功",icon: "success",duration:2000})
						this.$refs.popup.close()
						//重新加载数据
						ajax.get(config.fuelSelect_url,{
						  // params:"萧山市北路加油站"
						}).then(res => {
						console.log("获取加油员列表")
						  console.log(res)
						  if(res.code == 0){
							  this.adminList = res.data
							  
						  }
						}).catch(err => {
						  //ajax.js反馈的reject结果
						  console.log(err)
						})
					}else if(res.code == -8014){
						uni.showToast({title:"加油员手机号已经注册过了,换一个吧",icon: "none",duration:2000})
					}else if(res.code == -8001){
						uni.showToast({title:"参数为空",icon: "none",duration:2000})
					}
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			},
			//提交修改驾驶员
			goEdit(){
				if(this.adminNameEdit == ""){
					uni.showToast({title:"加油员姓名必填",icon: "none",duration:2000})
					return
				}
				if(this.adminNameEdit.length >= 6){
					uni.showToast({title:"加油员姓名请控制到1-5位之间",icon: "none",duration:2000})
					return false
				}
				if(!this.chinese(this.adminNameEdit,"加油员姓名")){
				  return false
				}
				//身份证验证
				var regId = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
				if(this.idCardNew == ""){
					uni.showToast({title:"身份证号码必填",icon: "none",duration:2000})
					return
				}else if (!this.idCardNew.match(regId)) {
					uni.showToast({title:"身份证号格式错误",icon: "none",duration:2000})
				  return
				}
				
				if(this.shenfenNew == ""){
					uni.showToast({title:"加油员身份证必须上传",icon: "none",duration:2000})
					return
				}
				if(this.iPhone2 == ""){
					uni.showToast({title:"手机号必填",image:"/static/erreo.png",icon: "none",duration:2000})
					return
				}
				if(this.phoneRlus(this.iPhone2) == false){
				  return false
				}
				if(this.iPhoneCode2 == ""){
					uni.showToast({title:"手机验证码必填",icon: "none",duration:2000})
					return
				}
				console.log("修改提交")
				//saveSelect_url
				ajax.post(config.saveSelect_url,{
					id:this.adminId,
					energyGasStationId:1,
					name:this.adminNameEdit,
					phone:this.iPhone2,
					card:this.idCardNew,
					cardUrl:this.shenfenNew
				}).then(res => {
					console.log("修改加油员")
					console.log(res)
					if(res.code == 0){
						uni.showToast({title:"修改成功",icon: "success",duration:2000})
						this.$refs.popup2.close()
						//重新加载数据
						ajax.get(config.fuelSelect_url,{
						  // params:"萧山市北路加油站"
						}).then(res => {
						console.log("获取加油员列表")
						  console.log(res)
						  if(res.code == 0){
							  this.adminList = res.data
							  
						  }
						}).catch(err => {
						  //ajax.js反馈的reject结果
						  console.log(err)
						})
					}else if(res.code == -8014){
						uni.showToast({title:"加油员手机号已经注册过了,换一个吧",icon: "none",duration:2000})
					}
				}).catch(err => {
				  //ajax.js反馈的reject结果
				  console.log(err)
				})
			},
			//跳转到驾驶员详情页面
			go2(index){
				uni.navigateTo({
					url: '/pages/manager/adminInfo/adminInfo?phone='+index
				});
			},// 监听触底
			onReachBottom() {
				if(!this.viewBottom){
					this.getnewsList();
				}
			},
			//获取验证码
			yan(e){
				let num = e.currentTarget.dataset.name
				if(!this.time){
				  let timerTim = this.yanzhen
				  timerTim = timerTim.substring(0,timerTim.length - 1)
				  uni.showToast({ title: "请您"+timerTim+"秒之后重试", icon: "none",duration: 2000 });
				  return
				}
				if(num == "add"){
				  //法人手机号长度,格式,非空验证
				  if(this.phoneRlus(this.iPhone1) == false){
				    return false
				  }
				  this.yufang()
				  console.log(this.iPhone1 + "去获取验证码")
				}else if(num == "edit"){
				  //被授权人手机号长度,格式,非空验证
				  if(this.phoneRlus(this.iPhone2) == false){
				    return false
				  }
				  this.yufang()
				  console.log(this.iPhone2 + "去获取验证码")
				}
			},
			//防止用户获取验证码的重复点击
			yufang:function(){
			  this.time = false
			  if(this.yanzhen != "获取验证码"){
			    return
			  }
			  let tim = 60;
			  this.yanzhen = tim+"s"
			  let timer = setInterval(()=>{
			    tim--
			    this.yanzhen = tim+"s"
			    if(tim == 0){
			      this.yanzhen = "获取验证码"
			      this.time = true
			      clearInterval(timer)
			    }
			  },1000)
			},
			//手机号长度,格式,非空验证
			phoneRlus:function(phone){
			  if(phone == ""){
			    uni.showToast({title:"手机号必填",image:"/static/erreo.png",icon: "none",duration:2000})
			    return false
			  }
			  if (phone.length > 11) {
				uni.showToast({title:"手机号输入超过11位,请重新输入",icon: "none",duration:2000})
			    return false
			  }
			  if (!(/^1[34578]\d{9}$/.test(phone))) {
				uni.showToast({title:"手机号输入有误,请重新输入",icon: "none",duration:2000})
			    return false
			  }
			},
			addImg(e){
				let name = e.currentTarget.dataset.img
				
				console.log("上传")
				uni.chooseImage({
				    count: 1, // 默认最多一次选择9张图
					
				    // 	sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有(如果不设置设置二者都有)
				    success: res=> {
				        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				        var tempFilePaths = res.tempFilePaths;
				
				        //支持多图上传
				        for (var i = 0; i < res.tempFilePaths.length; i++) {
							//显示消息提示框
							uni.showLoading({
							  mask: true
							})
				
				            //上传图片
				            //图片路径可自行修改
							uploadImage(
								res.tempFilePaths[i],
								'images/',
								 
								result => {
									console.log(result)
									if(result.code == 0){
										if(name == "shenfen"){
											console.log("新增")
											this.shenfen = result.data
										}else if(name == "shenfenNew"){
											console.log("修改")
											this.shenfenNew = result.data
										}
									}else if(result.code == -1){
										uni.showToast({title:"上传失败,请重新上传",icon: "none",duration:2000})
									}
									
									
									uni.hideLoading();
								}
				            )
				        }
				    }
				})
				//
			},
			//事件示例
			bindClick(e){
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				})
			},
			//筛选提交
			inquire(){
				// if(this.adminName2 == ""){
				// 	uni.showToast({title:"加油员姓名/加油站名称/手机号必填",icon: "none",duration:2000})
				// 	return
				// }
				this.viewBottom = false
				this.seachType = 3
				this.adminList = []
				this.pageIndex = 1
				this.getnewsList()
				this.reset()
				
			},
			//重置
			reset(){
				this.adminName2 = ""
				this.adminType = 1
			},
			//筛选是状态-启用,禁用
			adminTypes(e){
				// console.log(this.adminName2)
				// console.log(this.adminType)
				let index = e.currentTarget.dataset.index
				this.adminType = index
				console.log(this.adminType)
			},
			//中文验证
			chinese:function(value,name){
			  var pattern = /^[\u4e00-\u9fa5]+$/;
			  if(pattern.test(value)){
			    return true
			  }else{
			    uni.showToast({ title: name + "必须是中文", icon: "none",duration: 2000,mask:true });
			    return false
			  }
			},
			// 获取加油员
			getnewsList(){
				
				if(this.seachType == 1){
					//获取加油员列表
					ajax.get(config.fuelSelect_url,{
					  // params:"萧山市北路加油站"
					  pageIndex:this.pageIndex,
					  pageSize:this.pageSize,
					}).then(res => {
					console.log("获取加油员列表")
					  console.log(res)
					  if(res.code == 0){
						  if(res.data == null){
						  	this.viewBottom = true
						  	return
						  }
						  this.pageIndex ++
						  this.adminList = this.adminList.concat(res.data)
					  }
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}else if(this.seachType == 2){
					//获取加油员列表
					ajax.get(config.fuelSelect_url,{
					  pageIndex:this.pageIndex,
					  pageSize:this.pageSize,
					  params:this.adminName1
					}).then(res => {
					console.log("获取加油员列表")
					  console.log(res)
					  if(res.code == 0){
						  if(res.data == null){
						  	this.viewBottom = true
						  	return
						  }
						  this.pageIndex ++
						  this.adminList = this.adminList.concat(res.data)
					  }
					}).catch(err => {
					  //ajax.js反馈的reject结果
					  console.log(err)
					})
				}else if(this.seachType == 3){
					console.log(this.adminName2)
					console.log(this.adminType)
					//获取加油员列表
					ajax.get(config.fuelSelect_url,{
						params:this.adminName2,
						gasStationPersonnelState:this.adminType,
						pageIndex:this.pageIndex,
						pageSize:this.pageSize,
					}).then(res => {
					console.log("获取加油员列表")
					  console.log(res)
					  if(res.code == 0){
						  this.$refs.popup3.close()
						  if(res.data == null){
						  	this.viewBottom = true
						  	return
						  }
						  this.pageIndex ++
						  this.adminList = this.adminList.concat(res.data)
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
	
	.drawer .enableView{
		width: 240upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		font-size: 24upx;
		border-radius: 8upx;
		color: #999999;
		background-color: #F0F0F0;
	}
	.drawer .enableView.active{
		color: #333;
		background-color: #FDB82B;
	}
	.drawer{
		padding: 72upx 22upx 0 20upx;
		position: relative;
		height: 100vh;
	}
	.viewBottom{
		color: #949494;
		text-align: center;
		font-size: 30upx;
		margin: 20upx;
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
	.adminView .boxContent{
		margin-bottom: 40upx;
		height: 130upx;
		background-color: #fff;
		width: 100%;
		border-radius: 8upx;
	}
	.adminView .boxContent .boxView{
		width: 690upx;
		height: 130upx;
	}
	.adminView .boxContent .boxView .info{
		padding: 28upx 18upx 0 14upx;
		width: 650upx;
		float: left;
		height: 130upx;
		display: flex;
		justify-content:space-between;
	}
	.adminView .boxContent .boxView .info .userImg{
		width: 74upx;
		height: 74upx;
		border:2upx solid #FDB82B;
		display: flex;
		justify-content:center;
		align-items:center;
		border-radius: 50%;
	}
	.adminView .boxContent.active .boxView .info .userImg{
		border-color: #A3A3A3;
	}
	.adminView .boxContent .boxView .info .userImg image{
		width: 50upx;
		height: 50upx;
	}
	.adminView .boxContent .boxView .info .userInfo{
		width: 516upx;
		height: 130upx;
	}
	.adminView .boxContent .boxView .info .userInfo .top{
		color: #333333;
		font-size: 32upx;
		line-height: 26upx;
		padding-bottom: 10upx;
		border-bottom: 2upx solid #F2F2F2;
	}
	.adminView .boxContent.active .boxView .info .userInfo .top{
		border-color: #A3A3A3;
	}
	.adminView .boxContent.active .boxView .info .userInfo .bottom,.adminView .boxContent.active .boxView .info .user .userInfo .top,.adminView .boxContent.active .boxView .info .userInfo .top{
		color: #A3A3A3;
	}
	.adminView .boxContent .boxView .info .userInfo .bottom{
		font-size: 24upx;
		line-height: 32upx;
		color: #666;
		margin-top: 4upx;
	}
	.adminView .boxContent .boxView .userEnable{
		width: 40upx;
		height: 130upx;
		font-size: 20upx;
		line-height: 28upx;
		padding: 28upx 10upx 0;
		color: #fff;
		background-color: #2AC980;
		float: right;
	}
	.adminView .boxContent.active .boxView .userEnable{
		background-color: #666666;
	}
	.adminView .boxContent .type{
		width: 100upx;
		height: 130upx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 24upx 10upx 0 10upx;
	}
	.adminView .boxContent .type text{
		font-size: 24upx;
		line-height: 32upx;
		color: #fff;
		display: block;
		margin-top: -10upx;
	}
	.adminView .boxContent .type image{
		width:44upx;
		height: 44upx;
	}
	.adminView .boxContent .type.disable{
		background-color: #666666;
	}
	.adminView .boxContent .type.enable{
		background-color: #2AC980;
	}
	.adminView .boxContent .type.alter{
		background-color: #2E95FA;
	}
	.adminView .boxContent .type.delete{
		background-color: #FC5E4B;
	}
	.adminView .boxContent .type.delete image{
		width:50upx;
		height: 50upx;
	}
	.adminView .boxContent.active{
		background-color: #E5E5E5;
	}
	
	.adminView{
		padding: 0 30upx;
	}
	.adminView>.top{
		height: 80upx;
		margin-top: 20upx;
	}
	.adminView>.top>.left{
		height: 80upx;
		position: relative;
		width: 590upx;
		margin: 0;
		
	}
	.adminView>.top>.left input{
		width: 590upx;
		height: 80upx;
	}
	.adminView>.top>.left image{
		position: absolute;
		top: 15upx;
		right: 20upx;
		width: 50upx;
		height: 50upx;
		z-index: 10;
	}
	.adminView>.top>.right{
		width: 80upx;
		height: 80upx;
		background-color: #FDB82B;
		color: #333333;
		font-size: 28upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 8upx;
	}
	.adminView .box{
		margin-top: 24upx;
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
