// pages/personComponent/feedback/feedback.js
import API from '../../../utils/api.js';
const APP = getApp();
Page({
  data: {
    srcUrl: '',
    pics:[],
    content: ''
  },
  imgStr: '',
  key: 0,
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
      },
      complete: function () {
      }
    })
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
    var that = this
    var form = {
      content: e.detail.value.content,
      user_id: APP.globalData.userInfo.id
    }
    var pics = this.data.pics
    wx.showLoading({
      title: '提交中',
    })
    if (pics.length !== 0) {
        for (var i in pics) {
            wx.uploadFile({
                url: API.feedbackImg,
                filePath: pics[i],
                name: 'img',
                formData: {},
                success: function(res){
                    that.key++
                    if (that.imgStr !== '') {
                        that.imgStr += ',' + res.data
                    } else {
                        that.imgStr += res.data
                    }
                    if (that.key == pics.length) {
                        form['img'] = that.imgStr
                        that.textContent(form)
                    }
                }
            })
        }
    } else {
        this.textContent(form)
    }
  },
  // 文本意见提交
  textContent: function (form) {
    APP.requestData(API.feedback, form, (err, data) =>{
        wx.hideLoading()
        if (data) {
            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration:2000,
                success: function(){
                    var timer = setTimeout(() =>{
                        wx.navigateBack({
                            delta: 1
                        })
                        clearTimeout(timer)
                    }, 2000)
                }
            })  
        } else {
            wx.showToast({
                title: '提交失败',
                image: '../../../image/gth.png',
                duration:2000,
                success: function() {
                    var timer = setTimeout(() =>{
                        wx.navigateBack({
                        delta: 1
                    })
                    clearTimeout(timer)
                    }, 2000)
                }
            })  
        }
    },'POST')
    }
})