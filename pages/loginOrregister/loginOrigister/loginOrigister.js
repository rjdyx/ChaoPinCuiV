Page({
  data: {
  },
  toRegister: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  toLogin: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  }
})