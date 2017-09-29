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
  // loginClick: function(){
  //   var loginName = this.data.loginName
  //   var password = this.data.password
  //   if (loginName != null && password != null) {
  //     var backUrl = this.data.backUrl
  //     app.globalData.userInfo = {
  //       loginName: loginName,
  //       password: password
  //     }
  //     wx.redirectTo({
  //       url: backUrl
  //     })
  //   } else {
  //     this.setData({
  //       loginName: null,
  //       password: null
  //     })
  //   }
  // },
  formSubmit: function(e) {
    
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
        console.log(res)
        if (res.data.id != undefined) {
          app.showToast('登录成功', 'success', 1500)
          wx.navigateBack({
            delta: 2
          })
          // wx.navigateTo({
          //   url: '../../home/home/home'
          // })
        } else{
          if (res.data == 300) {
            app.showToast('微信号已被使用', 'success', 1500)
          } else if (res.data == 400) {
            app.showToast('用户名或密码错误', 'success', 1500)
          }
        }
      }
    })
  }
})