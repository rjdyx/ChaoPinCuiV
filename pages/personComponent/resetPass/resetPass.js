var app = getApp()
Page({
  data:{
    https: 'https://cpc.find360.cn/'
  },
  onLoad: function(e) {
    if (app.globalData.userInfo.id == null || app.globalData.userInfo.id == undefined || app.globalData.userInfo.id == '') {
      wx.redirectTo({
        url: '../../loginOrregister/loginOrigister/loginOrigister',
      })
    } else {
      this.WxValidate = app.WxValidate({
        orin_pass: {
          required: true
        },
        now_pass: {
          required: true,
          minlength: 9,
          alnum: true
        },
        now_pass_rep: {
          required: true,
          equalTo: 'now_pass'
        }
      },
        {
          orin_pass: {
            required: '请输入当前密码'
          },
          now_pass: {
            required: '请输入修改密码',
            minlength: '密码最小为9位',
            alnum: '输入字母和数字'
          },
          now_pass_rep: {
            required: '请再次输入密码',
            equalTo: '两次密码不一致'
          }
        })
    }
    
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
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0]
        app.showToast(error.msg,'../../../image/gth.png',2000)
        return false
    }
    var arr = [e.detail.value.orin_pass, e.detail.value.now_pass]
    this.submitTo(arr)
  },
  submitTo: function(arr){
    var that = this
    var userId = app.globalData.userInfo.id
    var url = 'https://cpc.find360.cn/api/home/user/password'
    var msg = '../../../image/gth.png'
    wx.request({
      url: url,
      data: {
        orin_pass: arr[0],
        now_pass: arr[1],
        user_id: userId
      },
      method: "POST",
      success: function(res){
        if (res.data == 100) {
          app.showToast('参数错误！', msg, 2000)
        } else if (res.data == 102) {
          app.showToast('当前密码错误', msg, 2000)
        } else if (res.data == 200) {
          app.showToast('修改成功', msg, 2000)
          setTimeout(function(){
            wx.navigateBack();   //返回上一个页面
          },2000)
        } else {
          app.showToast('未知错误', msg, 1500)
        }
      }
    })
  }
})