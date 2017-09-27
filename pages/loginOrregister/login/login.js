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
  loginClick: function(){
    var loginName = this.data.loginName
    var password = this.data.password
    if (loginName != null && password != null) {
      var backUrl = this.data.backUrl
      app.globalData.userInfo = {
        loginName: loginName,
        password: password
      }
      wx.redirectTo({
        url: backUrl
      })
    } else {
      this.setData({
        loginName: null,
        password: null
      })
    }
    wx.request({
      url: 'http://api/home/company',
      success: function(res){
        console.log(res)
      }
    })
  }
})