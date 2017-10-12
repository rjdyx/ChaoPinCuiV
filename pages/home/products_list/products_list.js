// pages/common/pages/products_list/products_list.js
const APP = getApp();
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    https: 'https://cpc.find360.cn/',
    proList: [],
    tip: '加载更多',
    op: {},
    pageNum: 0, //页数
    isLoading: false,
    proLoadList: [],
    totalPage: 5 //总页数
  },
  jumpFn: function(e){
    console.log(e)
    var url = '../details/details' + '?id=' + e.currentTarget.dataset.id
    let pages = getCurrentPages()
    console.log(pages)
    console.log('pages----')
    if (pages.length >= 4) {
        wx.redirectTo({
          url: url
        })
    }else{
      wx.navigateTo({
        url: url
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    self.setData({
      'options': options
    })
    console.log('products_list.js------------')
    console.log(options)
    wx.setNavigationBarTitle({title: options.name})
    wx.showLoading({
      title: '加载中',
    })
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
        var op = {
          category_id:  options.id,
          lon: longitude,
          lat: latitude,
          pageNum: self.data.pageNum
        }
        console.log(options.type)
        if (options.type) {
          op.type= options.type
        }
        if (options.searchName) {
          op.name= options.searchName
        }
        self.setData({
          'op': op
        })
        self.dataLoadFn()
      }
    })
  },
  dataLoadFn: function(){
    var self = this
    APP.requestData(API.proList, this.data.op, (err, data) =>{
      console.log('proList')
      console.log(data)
      if (data != undefined) {
        self.setData({
          "proLoadList": data
        })
        self.data.proLoadList.forEach((objItem, i) => {
          self.data.proLoadList[i].dis = Number(self.data.proLoadList[i].dis).toFixed(2)
        })
        self.setData({
          "proLoadList": self.data.proLoadList,
          'isLoading': false,
          'proList': self.data.proList.concat(self.data.proLoadList)
        })
      }
      wx.hideLoading()
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
        console.log('pages---------')
      let pages = getCurrentPages()
    console.log(pages)
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
   console.log('pull')
    if (this.data.pageNum < this.data.totalPage) {
      var pageNum = this.data.pageNum + 1
      this.setData({
        'isLoading': true,
        'pageNum': pageNum,
        'op.pageNum': pageNum,
      })
      this.dataLoadFn()
    }
      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})