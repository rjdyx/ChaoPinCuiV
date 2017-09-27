// pages/personComponent/feedback/feedback.js
var app = getApp()
Page({
  data: {
    srcUrl: '',
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function(e){
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // upload: function() {
  //   var that = this
  //   wx.chooseImage({
  //     success: function (res) {
  //       var tempFilePaths = res.tempFilePaths
  //       wx.uploadFile({
  //         url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
  //         filePath: tempFilePaths[0],
  //         name: 'file',
  //         formData: {
  //           'user': 'test'
  //         },
  //         success: function (res) {
  //           var data = res.data
  //           //do something
  //           this.setData({srcUrl: data})
  //         }
  //       })
  //     }
  //   })
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})