import Vue from 'vue'
import App from './App'

//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

//全局默认高度
Vue.prototype.hearHeight = 20
let myDate = new Date(),
	myYear = myDate.getFullYear(),
	myMonth = myDate.getMonth() + 1,
	myDay = myDate.getDate(),
	myDateNow = myYear + "-" + myMonth + "-" + myDay;
	Vue.prototype.$myDateNow = myDateNow

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载vuex
	store
})
app.$mount()
