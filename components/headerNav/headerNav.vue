<template>
	<view class="headerNav spaceBetween" :class="[paddingBottom ? 'paddingBottom':'',position ? 'position':'']" :style="[{'padding-top':statusBarH + 'upx'}, bgColor,fontColor]">
		<slot v-if="isBack" name="back"></slot>
		<view class="title">{{title}}</view>
		<slot v-if="isImg" name="clickImg"></slot>
	    <!-- <view class="inner flexbox flex_alignc" :class="[fixed ? 'fixed' : '']" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px', 'color': titleTintColor}, bgColor]">
	        返回 
	        <text class="uni_icoBack iconfont icon-arrL" v-if="isBack" @tap="goBack"></text>
	        <view v-if="isBack" @tap="goBack">
	            <slot name="back"></slot>
	        </view>
	        <slot name="headerL"></slot>
	        标题

	        <view class="flex1" v-if="!search && center"></view>

	        <view class="uni_title flex1" :class="[center ? 'uni_titleCenter' : '']" :style="[isBack ? {'font-size': '32upx', 'padding-left': '0'} : '']" v-if="!search && title">
	            {{title}}
	        </view>
	        <view class="uni_search flex1" :class="[searchRadius ? 'uni_searchRadius' : '']" v-if="search"> />
	            <input class="uni_searchIpt flex1" type="text" placeholder="搜索" placeholder-style="color: rgba(255,255,255,.5);" />
	        </view>
	        右侧
	        <view class="uni_headerRight flexbox flex_row flex_alignc">
	            <slot name="iconfont"></slot>
	            <slot name="string"></slot>
	            <slot name="image"></slot>
	        </view>
	    </view> -->
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            statusBarH: this.statusBar*2
	        }
	    },
	    props: {
	        isBack: { type: [Boolean, String], default: true },
			isImg: { type: [Boolean, String], default: true },
			paddingBottom: { type: [Boolean, String], default: false },
			position: { type: [Boolean, String], default: false },
	        title: { type: String, default: '' },
	        fontColor: Object,
	        bgColor: Object,
	        center: { type: [Boolean, String], default: true },
	        search: { type: [Boolean, String], default: false },
	        searchRadius: { type: [Boolean, String], default: false },
	        fixed: { type: [Boolean, String], default: true },
	    },
	    computed: {
	        style() {
	            let _style = `height: ${this.customBarH}px;`
	            return _style
	        }
	    },
	    methods: {
	        goBack() {
	            uni.navigateBack()
	        }
	    }
	}
</script>

<style lang="less">
	
	.headerNav{
		padding-right: 30upx;
		padding-left: 30upx;
		padding-bottom: 20upx;
		height: 54upx;
		box-sizing: content-box;
		position: fixed;
		top: 0;
		left: 0;
		width: calc(100% - 60upx);
		z-index: 100;
		color: #fff;
	}
	.headerNav.position{
		position: unset;
	}
	.headerNav.paddingBottom{
		padding-bottom: 138upx;
	}
	.headerNav .title{
		padding-left: 60upx;
		font-size: 40upx;
		line-height: 54upx;
	}
</style>

