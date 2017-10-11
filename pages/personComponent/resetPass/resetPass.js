var app = getApp()
Page({
  data:{
    https: 'https://cpc.find360.cn/'
  },
  onLoad: function(e) {
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange : function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function(e){
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function(e){
    var arr = [e.detail.value.orin_pass, e.detail.value.now_pass, e.detail.value.now_pass_rep]
    if (arr[0]!='' && arr[1]!='' && arr[2]!='') {
      this.submitTo(arr)
    } else {
      app.showToast('请填写完整信息','../../../image/gth.png',1500)
    }
  },
  submitTo: function(arr){
    var that = this
    var userId = app.globalData.userInfo.id
    var url = 'https://cpc.find360.cn/reset/password'
    wx.request({
      url: url,
      data: {
        orin_pass: arr[0],
        now_pass: arr[1],
        now_pass_rep: arr[2],
        user_id: userId
      },
      method: "POST",
      success: function(res){
        if (res.data == 100) {
          app.showToast('参数错误！','../../../image/gth.png',1500)
        } else if (res.data == 101) {
          app.showToast('两次密码不一致', '../../../image/gth.png', 1500)
        } else if (res.data == 102) {
          app.showToast('当前密码错误', '../../../image/gth.png', 1500)
        } else if (res.data == 200) {
          app.showToast('修改成功', '../../../image/pass.png', 1000)
          setTimeout(function(){
            wx.navigateBack();   //返回上一个页面
          },1000)
        } else {
          app.showToast('未知错误', '../../../image/gth.png', 1500)
        }
      }
    })
  }
})