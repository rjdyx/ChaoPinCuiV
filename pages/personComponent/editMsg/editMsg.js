var app = getApp()
Page({
  data:{
    array:['男','女'],
    index: '',
    date: '2016-09-01',
    region: ['广东省', '广州市', '海珠区'],
    image: '',
    name: '',
    phone: '',
    real_name: '',
    https: 'https://cpc.find360.cn/'
  },
  onLoad: function(e) {
    var that = this
    var userId = app.globalData.userInfo.id
    var url = 'https://cpc.find360.cn/api/home/user/' + userId + '/edit'
    wx.request({
      url: url,
      success: function(res){
        console.log(res)
        that.setData({
         image: res.data.img,
         name: res.data.name,
         phone: res.data.phone,
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
      date: e.detail.value
    })
  },
  bindRegionChange: function(e){
    console.log(e)
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
    console.log(e.detail.value)
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
        sex: e.detail.value.sex
      },
      method: "PUT",
      success: function(res){
        console.log(res)
        if (res.data == 101) {
          app.showToast('用户名已存在','success',1500)
        } else if (res.data == 102) {
          app.showToast('邮箱已存在', 'success', 1500)
        } else if (res.data == 103) {
          app.showToast('手机已存在', 'success', 1500)
        } else if (res.data != null || res.data != undefined) {
          app.showToast('编辑成功', 'success', 1500)
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