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
      url: 'http://cpc.find360.cn/api/home/comment',
      success: function(res) {
        console.log(res)
      }
      // header:{
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      // method: 'POST',
      // data: ({
      //   user: this.data.loginName,
      //   password: this.data.
      // })
      // success: function(res){
      //   console.log(res)
      // }
    })
  }
})