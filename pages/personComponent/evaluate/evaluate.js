// pages/personComponent/evaluate/evaluate.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    prints: [],
    stars: [0, 1, 2, 3, 4],
    userName: '',
    img:'',
    apiUrl: app.globalData.apiUrl,
    normalSrc: '../../../image/star2.png',
    selectedSrc: '../../../image/allstar.png',
    halfSrc: '../../../image/halfstar.png',
    key: 0,//评分,
    https:'https://cpc.find360.cn/'
  
  },
  // 跳转
  productSkip: function (e) {
    wx.navigateTo({
      url: '../../home/details/details?id=' + e.currentTarget.dataset.pid
    })
  },
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({ title: '我的评价' })
      var that = this
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.request({
          url: that.data.https + '/api/home/user/' + wx.getStorageSync('userInfo').id + '/edit',
          success: function (res) {
            that.setData({
              img: res.data.img,
              userName: res.data.real_name
            })
          }
        })
        wx.request({
          url: that.data.https + '/api/home/comment',
          method: 'GET',
          data: {
            user_id: wx.getStorageSync('userInfo').id,
            openid: wx.getStorageSync('user')
          },
          success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].img != null) {
                res.data[i].img = res.data[i].img.split(',')
              }
            }
            that.setData({
              prints: res.data
            })
            that.setData({
              num: res.data.length
            })
          }
        })
      }, 1000)
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
  
  }
})