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
    pageNum: 1, //页数
    isLoading: false,
    proLoadList: [],
    totalPage: 0 //总数量
  },
  jumpFn: function(e){
    var url = '../details/details' + '?id=' + e.currentTarget.dataset.id
    let pages = getCurrentPages()
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
    wx.setNavigationBarTitle({title: options.name})
    wx.showLoading({
      title: '加载中',
    })
    var op = {
      id: options.id,
      category_id: options.category_id,
      parent_id: options.parent_id,
      page: self.data.pageNum
    }
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
    // 获取当前的地理位置

    // ----------------------
    wx.getSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    })
    // ---------------------- 
  },
  dataLoadFn: function(){
    var self = this
    APP.requestData(API.proList, this.data.op, (err, data) =>{
      if (data != undefined) {
        self.setData({
          "proLoadList": data.data,
          'totalPage': data.last_page
        })
        if (data.data[0].meridian) {
          self.getLocation()
        } else {
          self.setData({
            "proLoadList": self.data.proLoadList,
            'isLoading': false,
            'proList': self.data.proList.concat(self.data.proLoadList)
          })
          wx.hideLoading()
        }
      }
    })
  },
  // 获取自身地理位置
  getLocation: function () {
    var self = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var speed = res.speed
        var accuracy = res.accuracy
        self.data.proLoadList.forEach((objItem, i) => {
          self.data.proLoadList[i].dis = APP.getDistince(self.data.proLoadList[i].weft,self.data.proLoadList[i].meridian,res.latitude,res.longitude).toFixed(2)
        })
        self.data.proLoadList = self.getSort(self.data.proLoadList)
        self.setData({
          "proLoadList": self.data.proLoadList,
          'isLoading': false,
          'proList': self.data.proList.concat(self.data.proLoadList)
        })
        wx.hideLoading()
      }
    })
  },
  // 景点距离从小到大排序
  getSort(arr) {
    var s = {} //定义最小值
    for(var i=0; i<arr.length; i++) {
      for(var j=i+1; j<arr.length; j++) {
        if(parseFloat(arr[i].dis)>parseFloat(arr[j].dis)) {
          s = arr[j]
          arr[j] = arr[i]
          arr[i] = s
        }
      }
    }
    return arr
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
      let pages = getCurrentPages()
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
    if (this.data.pageNum < this.data.totalPage) {
      var pageNum = this.data.pageNum + 1
      this.setData({
        'isLoading': true,
        'pageNum': pageNum,
        'op.page': pageNum,
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