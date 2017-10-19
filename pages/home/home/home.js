// pages/home/home/home.js
import API from '../../../utils/api.js';
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  autoplay: true,
  interval: 3000,
  duration: 1000,
  swiperCurrent: 0,
  navs: [],
  https: 'https://cpc.find360.cn/',
  banners: [],
  autoplay: true,
  interval: 3000,
  duration: 1000,
  navUrl: '../category/category',
  navs: [],
  list: [],
  },
  catchTapCategory: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.product_id
    })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    APP.requestData(API.homeCategorys, {}, (err, data) =>{
      if (data != undefined) {
        self.setData({
          "navs": data
        })
      }
    })
    // APP.requestData(API.homeCategorys, {}, (err, data) =>{
    //   if (data) {
    //     self.setData({
    //       "navs": data
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  swiperchange: function(e){
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: that.data.https+'/api/home/index/recommend', 
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          'list': res.data.data
        })
      }
    })
    wx.request({
      url: that.data.https+'/api/home/index/turns',
      success: function(res){
        that.setData({
          'banners': res.data.data
        })
      }
    })
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