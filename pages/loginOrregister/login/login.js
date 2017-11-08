var app = getApp()
Page({
  data: {
    backUrl: null,
    loginName: null,
    password: null
  },
  onload: function(options){
    this.setData({
      backUrl:null
    })
    this.setData({
      backUrl:options.backUrl
    })
  },
  inputClick: function(event){
    var objId = event.currentTarget.id
    var paraObj = {}
    paraObj[objId] = event.detail.value
    this.setData(paraObj)
  },
  toIndex: function() {
    app.homeUrl()
  },
  formSubmit: function(e) {
    var that = this
    var openid = wx.getStorageSync('user')
    var url = wx.getStorageSync('currentUrl')
    var cururl = '../../../' + url
    // var loginState = wx.getStorageSync('loginState')
    wx.request({
      url: 'https://cpc.find360.cn/api/home/wx/login',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data:{
        user: e.detail.value.user,
        password: e.detail.value.password,
        openid: openid
      },
      method: "POST", 
      success: function(res) {
        if (res.data == 300) {
          wx.showModal({
            title: '提示',
            content: '请填写手机号码',
            showCancel: false
          })
        } else if (res.data == 400) {
          app.showToast('用户名或密码错误', '../../../image/gth.png', 1500)
        } else {
          app.showToast('登录成功', '../../../image/pass.png', 1500)
          app.globalData.userInfo = {
              id : res.data.id,
              name : res.data.name,
              openid: res.data.openid              
          }
          setTimeout(function(){
            app.homeUrl()
          },1000)
        }
      }
    })
  },
  // 微信号登陆
  wxLogin: function(e) {
    var that = this
    var openid = wx.getStorageSync('user')
    wx.request({
      url: 'https://cpc.find360.cn/api/home/wx/wxlogin',
      data:{
        openid: openid
      },
      method: "GET",
      success: function(res) {
        if (res.data !== 500) {
          app.showToast('登录成功', '../../../image/pass.png', 1500)
          app.globalData.userInfo = {
              id : res.data.id,
              name : res.data.name,
              openid: res.data.openid              
          }
          setTimeout(function(){
            app.homeUrl()
          },1000)
        }
      }
    })
  }
})