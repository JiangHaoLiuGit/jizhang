<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({  
				success:function(e){
					Vue.prototype.statusBar = e.statusBarHeight + 5
					// Vue.prototype.statusBar = 20
					// #ifndef MP  
					if(e.platform == 'android') {  
						Vue.prototype.customBar = e.statusBarHeight + 50  
					}else {  
						Vue.prototype.customBar = e.statusBarHeight + 45  
					}  
					// #endif  
		
					// #ifdef MP-WEIXIN  
					let custom = wx.getMenuButtonBoundingClientRect()  
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight  
					// #endif  
		
					// #ifdef MP-ALIPAY  
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight  
					// #endif  
				}  
			})  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	/* 全局样式 */
	*{
		box-sizing: border-box;
	}
	body{
		background-color: #f4f4f4;
	}
	
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.widthB{
		width: 100%;
	}
	.spaceAround{
		display:flex;
		align-items:center;
		justify-content:space-around;
	}
	.spaceBetween{
		display: flex;
		align-items:center;
		justify-content:space-between;
	}
	.flexLeft{
		display: flex;
		justify-content: left;
		align-items: center;
	}
	.flexRight{
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.por{
		position: relative;
	}
	.poa{
		position: absolute;
	}
	.boxShadow{
		box-shadow:0 6upx 12upx rgba(0,0,0,.08)
	}
	.boxShadowSecond{
		box-shadow:0 6upx 12upx rgba(0,0,0,.16)
	}
	.borderRadius{
		border-radius:8upx;
	}
	.borderRadiusYuan{
		border-radius: 50%;
	}
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	.clearfix:after{
		clear: both;
		content:"";
		display: table;
	}
	.tooSmallText{
		font-size: 20upx;
		line-height: 28upx;
	}
	.smallText{
		font-size: 24upx;
		line-height: 32upx;
	}
	.inText{
		font-size: 28upx;
		line-height: 38upx;
	}
	.borderRadiousYuan{
		border-radius: 50%;
	}
	.bigText{
		font-size: 32upx;
		line-height: 42upx;
	}
	.fontWeight{
		font-weight: bold;
	}
	.fffColor{
		color: #fff;
	}
	.fffBackground{
		background: #fff;
	}
	.yellowBackground{
		background: #FDB82B;
	}
	.orangeBackground{
		background: #FD7F23;
	}
	.threeColor{
		color: #333;
	}
	.sixColor{
		color: #666;
	}
	.orangeColor{
		color: #FF5B00!important;
	}
	
	.redColor{
		color: red!important;
	}
	.marginTop{
		padding-top: 160upx!important;
		display: flow-root;
	}
	.paddingLeftRight{
		padding-left: 30upx;
		padding-right: 30upx;
	}
	uni-toast .uni-toast{
		padding: 0 20upx;
	}
	/* 重写提示框样式 */
	/* uni-toast{
		background: rgba(0,0,0,.21);
	}
	uni-toast .uni-toast{
		width: auto;
		padding: 30upx;
		background: rgba(0,0,0,.5);
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	uni-toast .uni-toast .uni-toast__icon,uni-toast .uni-toast .uni-toast__content{
		margin: 0;
	}
	uni-toast .uni-toast .uni-toast__content{
		max-width: 240upx;
		min-width: 180upx;
		font-size: 32upx;
		line-height: 42upx;
		padding-left: 24upx;
		text-align: left;
	} */
	/* 下面所有的都是大量页面会重复的样式 */
	.items{
		margin-top: 40upx;
	}
	.items:last-child{
		margin-bottom: 40rpx;
	}
	.items .itemsTop{
		padding: 12upx 36upx 12upx 16upx;
		height: 56upx;
	}
	.items .itemsTop.first{
		background-image: linear-gradient(to right, #FFFFFF , #FEB82C);
	}
	.items .itemsTop.second{
		background-image: linear-gradient(to right, #FFFFFF , #FD7F23);
	}
	.items .itemsBottom{
		padding: 14upx 24upx 18upx 16upx;
		background: #fff;
	}
	.items .itemsBottom .firmInfo{}
	.items .itemsBottom .firmInfo .infoTop{
		display: flex;
		justify-content: left;
	}
	.items .itemsBottom .firmInfo .infoTop .first{}
	.items .itemsBottom .firmInfo .infoTop .second{}
	.items .itemsBottom .firmInfo .infoTop .second image{
		width: 38upx;
		height: 28upx;
		margin-left:6upx;
		position: relative;
		top: 6upx;
	}
	.items .itemsBottom .firmInfo .infoBottom{
		display: flex;
		justify-content: left;
	}
	.items .itemsBottom .firmInfo .infoBottom .first{
		font-size: 20upx;
	}
	.items .itemsBottom .firmInfo .infoBottom .second{
		padding-left: 16upx;
		font-size: 20upx;
	}
	.items .itemsBottom .consume{
		display: flex;
		justify-content: last baseline;
	}
	.items .itemsBottom .consume .number{
		font-size: 60upx;
		line-height: 80upx;
		color: #FD5721;
		margin-right: 12upx;
	}
	.items .itemsBottom .consume .yuan{
		margin-top: 36upx;
	}
	.submitBtnGray{
		width: 690upx;
		height: 92upx;
		background: #CCCCCC;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 10upx;
		color: #333;
		font-size: 40upx;
		line-height: 92upx;
		margin-top:60upx;
		margin-bottom:60upx;
		line-height: 92upx;
	}
	.submitBtnOrange{
		width: 690upx;
		height: 92upx;
		background: #FD7D23;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 10upx;
		color: #fff;
		font-size: 40upx;
		line-height: 92upx;
		margin-top:60upx;
		margin-bottom:60upx;
		line-height: 92upx;
	}
	.submitBtnyello{
		width: 690upx;
		height: 92upx;
		background: #FDB82B;
		box-shadow: 0px 6upx 12upx rgba(0, 0, 0, 0.16);
		border-radius: 10upx;
		color: #fff;
		font-size: 40upx;
		margin-top:60upx;
		margin-bottom:60upx;
		line-height: 92upx;
	}
	.absoluteBtn{
		position: absolute;
		left: 30upx;
		bottom: 70upx;
	}
	.view{
		padding: 0 30upx;
	}
	.twoItem{
		display: flex;
		justify-content:space-between;
		align-items:end;
		padding: 0 20upx;
		background: #fff;
		margin-bottom: 2upx;
		border-radius: 8upx;
	}
	.twoItem>view{
		
		min-height: 80upx;
		line-height: 80upx;
		border-radius: 8upx;
		font-size: 28upx;
		line-height: 38upx;
		padding-top:20upx;
		color:#333;
	}
	.twoItem>view:nth-of-type(1){
		color: #666;
		width: 40%;
	}
	.twoItem>view:nth-of-type(2){
		text-align: right;
		width: 60%;
	}
	.twoItem .oilCar,.threeItem .oilCar{
		padding-bottom: 20upx;
		position: relative;
	}
	.twoItem .oilCar .carItem,.threeItem .oilCar .carItem{
		width: auto;
		height: 40upx;
		background: #6E6E6E;
		color: #fff;
		margin-right: 6upx;
		margin-bottom: 6upx;
		border-radius: 4upx;
		float: right;
		display: flex;
		justify-content:center;
		align-items:center;
		padding: 0 10upx;
		font-size: 24upx;
		line-height: 32upx;
	}
	.threeItem .oilCar .carItem{
		float: left;
	}
	.threeItem .oilCar .carInput{
		position: absolute;
		top: 20upx;
		left: 0;
		width: 450upx;
		height: 40upx;
		
	}
	.threeItem .oilCar .carInput text{
		font-size: 28upx;
		line-height: 38upx;
		color: #999999;
		float: left;
	}
	.threeItem .oilCar .carInput image{
		float: right;
		width: 16upx;
		height: 10upx;
		margin-top: 14upx;
	}
	.threeItem .oilItems{
		padding-bottom: 20upx;
	}
	.threeItem .oilitem{
		width: auto;
		height: 40upx;
		background: #FD8123;
		color: #fff;
		margin-right: 6upx;
		margin-bottom: 6upx;
		border-radius: 4upx;
		float: left;
		display: flex;
		justify-content:center;
		align-items:center;
		padding: 0 10upx;
		font-size: 24upx;
		line-height: 32upx;
	}
	.threeItem{
		display: flex;
		justify-content:space-between;
		align-items:end;
		padding: 0 30upx;
		background: #fff;
		margin-bottom: 2upx;
		border-radius: 8upx;
	}
	.threeItem>view{
		padding-top:20upx;
		min-height: 80upx;
		line-height: 80upx;
		border-radius: 8upx;
		color:#333;
		
		font-size: 28upx;
		line-height: 38upx;
	}
	
	.threeItem>view:nth-of-type(1){
		width: 170upx;
		color: #666;
	}
	.threeItem>view:nth-of-type(2){
		width: 420upx;
	}
	.threeItem>view:nth-of-type(3){
		width: 50upx;
		text-align: right;
		color: #999;
	}
	.rechargeInfo .textView{
		text-align: center;
	}
	/* 以上是充值或者加油列表样式比如加油清单或者充值清单 */
	
	/* 导航样式 */
	.navImg{
		width: 19upx;
		height: 32upx;
	}
	.navImgSecond{
		width: 60upx;
		height: 60upx;
	}
	.kong{
		width: 60upx;
		height: 60upx;
	}
	.shai{
		position: relative;
		top:14upx;
	}
	.kong .image image{
		width: 60upx;
		height: 60upx;
	}
	/*form 样式*/
	.formContent{
	  margin-top: 24rpx;
	}
	.formContent text{
	  font-size: 24rpx;
	  line-height: 38rpx;
	  color: #333;
	  margin-bottom: 12rpx;
	  display: block;
	}
	.formContent input,.formContent picker{
	  height: 80rpx;
	  border: 2rpx solid #E3E3E3;
	  border-radius: 8rpx;
	  background-color: #fff;
	  padding-left: 20rpx;
	  position: relative;
	  z-index: 10;
	}
	.formContent picker image.last{
	  position: absolute;
	  top: 35rpx;
	  right: 35rpx;
	  width: 16rpx;
	  height: 9rpx;
	  z-index: 1;
	}
	.formContent picker .text{
	  width: 100%;
	  height: 80rpx;
	  display: block;
	  line-height: 80rpx;
	  font-size: 28rpx;
	  color: #333;
	}
	.formContent input[disabled]{
	  background-color: #E3E3E3;
	}
	.formContent .box{
	  margin-top: 10rpx;
	  padding: 14rpx 22rpx 12rpx 26rpx;
	  background: #fff;
	  border: 2px dashed #E3E3E3;
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
	.formContent .phoneView{
	  margin-bottom: 20rpx;
	}
	.formContent .phoneView .text{
	  width: 500rpx;
	}
	.formContent .phoneView button{
	  width: 182rpx;
	  height: 80rpx;
	  background: #FC5E4B;
	  font-size: 24rpx;
	  line-height: 32rpx;
	  color: #fff;
	  margin-top: 0;
	}
	.formSelect{
		margin-top: 16upx;
	}
	.formSelect text{
		font-size: 24rpx;
		line-height: 38rpx;
		color: #333;
		margin-bottom: 18rpx;
		display: block;
	}
	.formSelect .viewSelect{
		padding: 0 30upx;
		flex-wrap: wrap;
	}
	.formSelect .viewSelect .select{
		padding: 8upx 76upx 10upx;
		border: 2upx solid #EAEAEA;
		color: #999999;
		font-size: 32upx;
		line-height: 42upx;
		position: relative;
		border-radius: 4upx;
	}
	.formSelect .viewSelect .select .icon{
		position: absolute;
		bottom: 0;
		right: 0;
		width: 24upx;
		height: 24upx;
		background: #fff;
	}
	.formSelect .viewSelect .select.active{
		border-color: #FD8624;
		color: #FD8624;
	}
	.formSelect .viewSelect .select.active .icon{
		background-color: #FD8624;
	}
	.formSelect .viewSelect .select .icon image{
		width: 18upx;
		height: 14upx;
	}
	.formContent input::-webkit-input-placeholder,.formContent textarea::-webkit-input-placeholder {
	  color: #999;
	  font-size: 24upx;
	}
	
	.formContent input:-moz-placeholder,.formContent textarea:-moz-placeholder {
	  color: #999;
	  font-size: 24upx;
	}
	
	.formContent input::-moz-placeholder,.formContent textarea::-moz-placeholder {
	  color: #999;
	  font-size: 24upx;
	}
	
	.formContent input:-ms-input-placeholder,.formContent textarea:-ms-input-placeholder {
	  color: #999;
	  font-size: 24upx;
	}
	.drawer{
		
	}
</style>
