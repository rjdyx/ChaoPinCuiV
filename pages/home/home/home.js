// pages/home/home/home.js
import API from '../../../utils/api.js';
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    https: 'https://cpc.find360.cn/',
    banners: [
      '../../../image/eg.png',
      '../../../image/eg.png',
      '../../../image/eg.png'],
  autoplay: true,
  interval: 3000,
  duration: 1000,
  navUrl: '../category/category?id=',
  navs: [],
  list: [
    { icon: '../../../image/eg.png', name: '手打牛肉丸', typeId: 0 },
    { icon: '../../../image/eg.png', name: '广济桥', typeId: 1 },
    { icon: '../../../image/eg.png', name: '潮剧', typeId: 2 },
    { icon: '../../../image/eg.png', name: '木雕', typeId: 3 },
  ],
  },
  catchTapCategory: function () {
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    APP.requestData(API.homeCategorys, {}, (err, data) =>{
      console.log('home----------------------')
      console.log(data)
      if (data) {
        self.setData({
          "navs": data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: 'https://cpc.find360.cn/api/home/index/recommend', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          list: res.data.data
        })
      }
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