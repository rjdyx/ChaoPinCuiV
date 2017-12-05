var app = getApp()
Page({
  data: {
    isChecked: false,
    checkbox: '',
    phone: '',
    name: '',
    password:'',
    sendmsg: 'nosend'
  },
  onload: function(){
  },
  authorizeCommit: function() {
    wx.openSetting({
      success: (res) => {
        wx.showLoading({
          title: '微信授权中',
          mask: true
        })
        app.loginAuthorize()
      }
    })
  }
})