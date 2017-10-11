// pages/home/comment/comment.js
import API from '../../../utils/api.js';
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    https: 'https://cpc.find360.cn/',
    height: 20,
    focus: false,
    stars: [0, 20, 40, 60, 80],
    normalSrc: '../../../image/star2.png',
    selectedSrc: '../../../image/全星.png',
    halfSrc: '../../../image/半星.png',
    key: 0 ,//评分,
    isUserName: true,
    userNameCol: '#ff713f', //默认匿名
    options: {},
    imgArr: []
  },
  imgStr: '',
  key: 0,
  addImgFn: function(e) {
    var self = this
    if (self.data.imgArr.length < 6) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                if (res.errMsg == "chooseImage:ok") {
                    self.data.imgArr.push(res.tempFilePaths[0])
                    self.setData({
                        'imgArr':self.data.imgArr
                    })
                }
            }
        })
    }
  },
  formSubmit: function(e){
    var form = {
      product_id: this.data.options.id,
      content: e.detail.value.content,
      level: this.data.key,
      img: '',
      isUserName: this.data.userNameCol === '#ff713f' ? 0 : 1, // 匿名：不匿名,
      user_id: APP.globalData.userInfo.id,
      openid:APP.globalData.userInfo.openid
    }
    var that = this
    for(var key in form){
      if(key === 'product_id' || key === 'content' || key === 'level' || key === 'user_id' || key === 'openid' ){
        if (!form[key]){
          var tip = ''
          switch (key) {
            case 'content':
              tip = '内容'
              break
            case 'level':
              tip = '评分'
              break
          }
          wx.showToast({
            title: '请输入' + tip,
            image: '../../../image/gth.png',
            duration:2000,
          })
          return true
        }
      }
    }
    wx.showLoading({
      title: '提交中',
    })
    if (this.data.imgArr.length !== 0) {
        for (var i in that.data.imgArr) {
            wx.uploadFile({
                url: API.commentImg,
                filePath: that.data.imgArr[i],
                name: 'img',
                formData: {},
                success: function(res){
                    that.key++
                    if (that.imgStr !== '') {
                        that.imgStr += ',' + res.data
                    } else {
                        that.imgStr += res.data
                    }
                    if (that.key == that.data.imgArr.length) {
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
  // 文本评分提交
  textContent: function (form) {
    APP.requestData(API.comment, form, (err, data) =>{
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
                    }, 3000)
                }
            })  
        }
    },'POST')
  },
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 10 && e.currentTarget.dataset.key == 10) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    this.setData({
      key: key
    })

  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    this.setData({
      key: key
    })
  },
  // 改变匿名按钮颜色方法
  changeUserNameColFn: function(){
      this.setData({
        isUserName: !this.data.isUserName
      })
      var col = this.data.isUserName ? "#ff713f" : "#dcdcdc" 
      this.setData({
        userNameCol: col
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "options": options
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindFormSubmit: function (e) {
  }
})