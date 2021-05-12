import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		access_token:"",
		refresh_token:"",
		rechargeId:0,//充值订单id
		oilId:0,//加油订单id
		stationId:0,//加油站id
		roles:1,//角色id:1是超级管理员,2是普通管理员,3是加油充值员
	},
    mutations: {//唯一允许更改state
		getAccessToken(state,info){
			state.access_token = info
		},
		getRefreshToken(state,info){
			state.refresh_token = info
		},
		getRechargeId(state,info){
			state.rechargeId = info
		},
		getOilId(state,info){
			state.oilId = info
		},
		getStationId(state,info){
			state.stationId = info
		},
		getRoles(state,info){
			state.roles = info
		}
	},
    actions: {}
})
export default store