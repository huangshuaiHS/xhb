var BG_IMG_BASE_URL = 'https://6461-data-1f0e99-1258386784.tcb.qcloud.la/weather/images/bg'//卡通背景

Page({
  data: {
    bgImgUrl:'',//获取背景
    // 需在 data 中配置广告位 
		u8ad: 
		{ 
			adData: {}, 
			ad: {
				banner: "banner", // banner 广告开关 
				insert: "insert", // 插屏广告开关 
				fixed: "fixed" // 悬浮广告开关 
				//如不需要展示删除即可 
			} 
		},
    dataSet: []
  },
  onShow() {
    var _this = this


    //支持页面转发
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    //初始化数据
    _this.init()


  },
  //初始化数据
  init() {
   
    this.setData({
      bgImgUrl:BG_IMG_BASE_URL+'/calm.jpg'
    })
    //发送请求获取数据
    wx.cloud.callFunction({
      name: "dataSet",
    }).then(res => {
      for (var i = 0; i < res.result.data.length; i++) {
        //处理时间
        res.result.data[i].time = Date.parse(res.result.data[i].time) / 1000
      }
      console.log("获取dataSet成功", res.result.data)
      this.setData({
        dataSet: res.result.data
      })
    }).catch(res => {
      console.log("获取dataSet出错", res)
    })
  },
  onLoad: function() {
    var _this = this
    let app = getApp();// 运行配置统计（重要：放在小程序入口页面，首页及广告展示页面）
    //自定义广告拉取(不使用自定义广告可删除)
    app.u8ad.getu8Ads({'adtype':5},function(res){
      for(var e=0;e < res.data.length;e++){
        res.data[e].encdata={"encdata":res.data[e].encdata};
      }
      _this.setData({adlist:res.data});
    })
},
  handleLike: function (event) {
    wx.showToast({
      title: '服务开发中,敬请期待',
      icon: 'none',
      duration: 2000
    })
  },
  tapCard: function (event) {
    var _this = this
    var cardId = event.detail.card_id
    //判断是什么Id
    if (cardId == null || cardId === '') {
      cardId = event.detail.user_id
    }
    var list = _this.data.dataSet;
    for (var index in list) {
      if (list[index].id == cardId) {
        var tiaoz = list[index]
        wx.navigateToMiniProgram({
          appId: tiaoz.user.appid,
          path: tiaoz.user.path,
          envVersion: 'release',
          success(res) {
            console.log("打开成功", tiaoz)
            tiaoz.leix = "tiaoz"
          }
        })
      }
    }
  },

  handleUserEvent: function (event) {
    const userId = event.detail.user_id
    this.tapCard(event)

  },
  //点击展开
  handleExpand: function (event) {
    const cardId = event.detail.card_id
    const expandStatus = event.detail.expand_status
    // code here
    console.log("expand call back")
  },
})