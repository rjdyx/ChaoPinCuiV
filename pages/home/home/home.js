// pages/home/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  autoplay: true,
  interval: 3000,
  duration: 1000,
  swiperCurrent: 0,
  navs: [
    {icon: '../../../image/foods.png', name: '美食', typeId: 0 },
    {icon: '../../../image/spot.png', name: '景点', typeId: 1 },
    {icon: '../../../image/art.png', name: '文艺', typeId: 2 },
    {icon: '../../../image/technique.png',name: '工艺', typeId: 3},
  ],
  },
  catchTapCategory: function () {
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: 'https://cpc.find360.cn/api/home/index/categorys', 
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          'list': res.data
        })
      }
    })
    wx.request({
      url: 'https://cpc.find360.cn/api/home/index/turns',
      success: function(res){
        that.setData({
          'banners': res.data.data
        })
      }
    })
  },
  swiperchange: function(e){
    this.setData({
      swiperCurrent: e.detail.current
    })
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