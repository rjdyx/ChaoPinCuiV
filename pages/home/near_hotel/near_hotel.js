const APP = getApp();
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    op: {},
    hotleList: [],
    arrList: [],
    totalPage: 0,
    isLoading: true,
    ads: '地址',
    phone: '电话',
    bigTapImg: '',
    pageNum: 1 //页数
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.setNavigationBarTitle({title: options.name})
    wx.showLoading({
      title: '加载中',
    })
    self.data.op = {
      meridian: options.meridian,
      weft: options.weft,
      page: self.data.pageNum
    }
    self.dataLoadFn()
  },
  /*
   * 获取加载数据
   */
  dataLoadFn: function(){
    var self = this
    APP.requestData(API.hotelList, self.data.op, (err, data) =>{
      if (data != undefined) {
        self.data.hotleList = data.pois
        self.setData({
          'arrList': self.data.arrList.concat(self.data.hotleList)
        })
        self.data.totalPage = parseInt(data.count/10) + 1
        if (self.data.totalPage == 1) {
          self.setData({
            'isLoading': false
          })
        }
        wx.hideLoading()
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

  /*
   * 提示地址
   */
  lookSourceFn: function (e) {
    wx.showModal({
      title: e.currentTarget.dataset.title,
      content: e.currentTarget.dataset.info,
      showCancel: false,
      confirmColor: '#FFD102'
    })
  },

  // 图片放大
  imgBlowUpFn: function(e) {
    var hotel_info = JSON.stringify(e.currentTarget.dataset.hotel_info)
    wx.navigateTo({
      url: '../hotel_detail/hotel_detail?hotel_info=' + hotel_info
    })
    // this.setData({
    //   'bigTapImg': e.currentTarget.dataset.img,
    //   'isImgBlowUp': e.currentTarget.dataset.bol
    // })
  },

  /*
   * 防止子元素冒泡
  **/
  eventStop: function(e) {
    return
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
    if (this.data.pageNum < this.data.totalPage) {
      var pageNum = this.data.pageNum + 1
      this.data.pageNum = pageNum
      this.data.op.page = pageNum
      this.dataLoadFn()
    } else {
      this.setData({
        'isLoading': false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})