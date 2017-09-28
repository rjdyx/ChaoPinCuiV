// pages/common/pages/products_list/products_list.js
const APP = getApp();
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    https: 'https://cpc.find360.cn/',
    proList: []
  },
  jumpFn: function(e){
    console.log(e)
    var url = '../details/details' + '?id=' + e.currentTarget.dataset.id
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    console.log('products_list.js------------')
    console.log(options)
    // 获取当前的地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude //纬度
        var longitude = res.longitude //经度
        var speed = res.speed
        var accuracy = res.accuracy
        console.log('getLocation--')
        console.log(res)
        var op = '?category_id=' + options.id + "&lon=" + longitude + "&lat=" + latitude
        console.log(options.type)
        if (options.type) {
          op += ('&type=' + options.type)
        }
        APP.requestData(API.proList + op, {}, (err, data) =>{
          console.log('proList')
          console.log(data)
          if (data) {
            self.setData({
              "proList": data
            })
          }
        })
      }
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
  
  }
})