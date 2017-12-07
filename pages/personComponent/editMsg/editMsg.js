var app = getApp()
Page({
  data:{
    array:['保密','男','女'],
    index: '',
    age: '2016-09-01',
    address: ['广东省', '广州市', '海珠区'],
    name: '',
    phone: '',
    real_name: '',
    https: 'https://cpc.find360.cn/'
  },
  onLoad: function(e) {
    this.WxValidate = app.WxValidate({
        real_name: {
            required: true
        },
        phone: {
            tel: true
        },
        email: {
            email: true
        }
    },
    {
        real_name: {
            required: '请输入昵称'
        },
        phone: {
            tel: '手机号格式不对'
        },
        email: {
            email: '邮箱格式不对'
        }
    })
    var that = this
    var userId = wx.getStorageSync('userInfo').id
    var url = 'https://cpc.find360.cn/api/home/user/' + userId + '/edit'
    wx.request({
      url: url,
      success: function(res){
            that.setData({
                phone: res.data.phone,
                email: res.data.email,
                age: res.data.age,
                real_name: res.data.real_name,
                index: res.data.sex,
                address: (res.data.address !== null && res.data.address !== '') ? res.data.address.split(',') : that.data.address
            })
        }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange : function(e){
    this.setData({
      age: e.detail.value
    })
  },
  bindRegionChange: function(e){
    this.setData({
      address: e.detail.value
    })
  },
  formSubmit: function(e){
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0]
        app.showToast(error.msg,'../../../image/gth.png',2000)
        return false
    }
    wx.showLoading({
      title: '',
    })
    var that = this
    var address = e.detail.value.address
    var addressTo = address.join(',')
    var userId = wx.getStorageSync('userInfo').id
    var url = 'https://cpc.find360.cn/api/home/user/setUpdate'
    wx.request({
        url: url,
        method: 'POST',
        data:{
            phone: e.detail.value.phone,
            address: addressTo,
            real_name: e.detail.value.real_name,
            age: e.detail.value.age,
            email: e.detail.value.email,
            sex: e.detail.value.sex,
            id: userId,
        },
        success: function(res){
            that.getRes(res)
        }
    })
  },
  // 提交返回值
  getRes: function(res) {
    if (res.statusCode === 200) {
        if (res.data != null || res.data != undefined) {
          var timer = setTimeout(() =>{
              wx.navigateBack({
                  delta: 1
              })
              app.showToast('修改成功', '../../../image/pass.png', 2000)
              clearTimeout(timer)
          }, 2000)
        }
    } else {
      app.showToast('提交失败', '../../../image/gth.png', 2000)
    }
  }
})