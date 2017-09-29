// pages/personComponent/feedback/feedback.js
var app = getApp()
Page({
  data: {
    srcUrl: '',
    pics:[]
  },
  chooseImage: function () {
    var that = this,
      　pics = this.data.pics;
    wx.chooseImage({
      count: 9 - pics.length,
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        　　pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  uploadimg: function(){
    // app.showToast('上传成功','success',1500)
    // this.data.pics = []
  },
  previewImage: function(e){
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },
  onShareAppMessage: function () {
  },
  formSubmit: function(e){
    var pics = this.data.pics
    app.uploadimg({
      url: 'https://cpc.find360.cn/api/home/feedback',
      path: pics
    })
    wx.request({
      url:'https://cpc.find360.cn/api/home/feedback',
      method: 'POST',
      success: function(res){
        console.log(res)
      }
    })
    console.log(e)
  }
})