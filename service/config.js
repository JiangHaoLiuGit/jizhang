let pathPrefix = "/api/"
const mock = "http://114.215.83.61:3100/mock/52/hab/"
let ip = "/ip/"
//http://192.168.101.38:8900
//#ifdef APP-PLUS
pathPrefix = "http://3506y2l291.wicp.vip:25916/"
//#endif
//http://3506y2l291.wicp.vip:42643/
//汪琪电脑ip http://192.168.101.38:8900
const config = {
  pathPrefix,
  login_url: pathPrefix + "login",//登录
  getUserInfo_url: pathPrefix + "appUser/getUserInfoByUserName",//登录
  todayInfo_url: pathPrefix + "transaction/todayInfo",//今日统计接口（登录进来后）
  Station_url: pathPrefix + "today/getListByStation",//获取今日油价以及折扣之后的油价
  rechargeList_url: pathPrefix + "recharge/selectList",//查看充值流水
  selectBy_url: pathPrefix + "station/selectByUsername",//获取加油站点信息
  infoById_url: pathPrefix + "company/getInfoByCode",//根据企业码获取信息(20多条信息)
  Record_url: pathPrefix + "recharge/insertRechargRecord",//提交充值信息
  selectById_url: pathPrefix + "recharge/selectById",//根据充值记录id获取充值记录信息
  todaySelect_url: pathPrefix + "today/selectByStationId",//加油界面根据加油站点和等级获取今日油价信息
  carSelectList_url: pathPrefix + "car/selectListByEnterpriseId",//根据企业id获取企业所属的车辆信息不包括挂靠
  carSelectTwoList_url: pathPrefix + "car/selectList",//根据企业简称获取企业所属的车辆信息不包括挂靠
  selectList_url: pathPrefix + "transaction/selectList",//交易流水列表
  fuelSelect_url: pathPrefix + "fuel/getList",//获取加油员列表
  losuSelect_url: pathPrefix + "fuel/losu",//启用/禁用加油员
  saveSelect_url: pathPrefix + "fuel/save",//新增/修改加油员信息
  todayStationId_url: pathPrefix + "today/selectByStationId",//加油界面根据加油站点和等级获取今日油价信息
  addCharge_url: pathPrefix + "deduction/addChargeDeduction",//提交加油信息
  deductionId_url: pathPrefix + "deduction/getInfoById",//根据id获取加油扣款信息
  driverCode_url: pathPrefix + "driver/selectByDriverCode",//根据司机码获取司机信息
  forHistory_url: pathPrefix + "today/getListForHistory",//获取历史站点油价信息
  oilToday_url: pathPrefix + "today/setOilPrice",//提交油价信息
  oilSelectList_url: pathPrefix + "deduction/selectList",//获取加油记录信息//
  driverUser_url: pathPrefix + "driver/selectByUsername",//获取加油记录信息
  deductionOil_url: pathPrefix + "transaction/selectByNumberForDeduction",//根据订单号和类型获取加油扣款明细
  deductionRecharge_url: pathPrefix + "transaction/selectByNumberForRecharge",//根据订单号获取充值明细
  _url: pathPrefix + "",//
  
}

module.exports = config







  // uni.request({
  //   url: 'http://192.168.0.134:8900/appUser/getUserInfoByUserName',
  //   method: "post",
  //   header: {
  //    'Content-Type': 'application/x-www-form-urlencoded', // 默认值
  //    'Authorization':'Bearer '+res.data.access_token
  //   },
  //   success(res) {
  //       console.log(res)
  //   },
  //   fail(error) {
  //       //失败结果
  //       console.log(error)
  //   }
  // })
  // ajax.post(wx.getStorageSync("config").weiXinBind_url,{
  //   userId: userid,
  // }).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   //ajax.js反馈的reject结果
  //   console.log(err)
  // })

  //wx.showToast({ title: "账号或密码必填", image:"/static/erreo.png",icon: "success",duration: 2000 });
  //杭州谷禾技术有限公司 40
