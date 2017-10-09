var app = getApp()
Page({
  data:{
    array:['男','女'],
    index: '',
    age: '2016-09-01',
    region: ['广东省', '广州市', '海珠区'],
    image: '',
    name: '',
    phone: '',
    real_name: '',
    https: 'https://cpc.find360.cn/'
  },
  checkData: ['name', 'phone', 'email'],
  onLoad: function(e) {
    this.WxValidate = app.WxValidate({
        name: {
            required: true,
            minlength: 6,
            maxlength: 50
        },
        phone: {
            tel: true
        },
        email: {
            email: true
        }
    },
    {
        name: {
            required: '请输入用户名',
            minlength: '不能小于6个字符',
            maxlength: '不能大于50个字符'
        },
        phone: {
            tel: '手机号格式不对'
        },
        email: {
            email: '邮箱格式不对'
        }
    })
    var that = this
    var userId = app.globalData.userInfo.id
    var url = 'https://cpc.find360.cn/api/home/user/' + userId + '/edit'
    wx.request({
      url: url,
      success: function(res){
        that.setData({
         image: res.data.img,
         name: res.data.name,
         phone: res.data.phone,
         email: res.data.email,
         age: res.data.age,
         real_name: res.data.real_name,
         index: res.data.sex
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
      region: e.detail.value
    })
  },
  chooseImage: function(){
    var that = this
    that.setData({
      https: ''
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: function(res){
        that.setData({
          image: res.tempFilePaths
        })
        wx.setStorageSync('img',that.data.image)
      }
    })
  },
  formSubmit: function(e){
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0]
        app.showToast(error.msg,'loading',2000)
        return false
    }
    console.log(this.data)
    return false
    var address = e.detail.value.address
    var addressTo = address.join(',')
    var userId = app.globalData.userInfo.id
    var url = 'https://cpc.find360.cn/api/home/user/' + userId
    // var imgUrl = wx.getStorageSync('img')
    wx.request({
      url: url,
      data: {
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        address: addressTo,
        real_name: e.detail.value.real_name,
        age: e.detail.value.age,
        email: e.detail.value.email,
        sex: e.detail.value.sex
      },
      method: "POST",
      success: function(res){
        if (res.data == 101) {
          app.showToast('用户名已存在','loading',2000)
        } else if (res.data == 102) {
          app.showToast('邮箱已存在', 'loading', 2000)
        } else if (res.data == 103) {
          app.showToast('手机已存在', 'loading', 2000)
        } else if (res.data != null || res.data != undefined) {
          app.showToast('修改成功', 'success', 2000)
          wx.setStorage({
            key: "mydata",
            data: { img: e.detail.value.img, name: e.detail.value.name },
            success: function () {
              wx.navigateBack();   //返回上一个页面
            }
          })
        }
      }
    })
  }
})