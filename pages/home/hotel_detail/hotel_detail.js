const APP = getApp();
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotels: {},
    isShowPop: {bol: false, type: 'source', title: ''},
    animationData: {},
    markers: [{        //标记点
      iconPath: "../../../image/location_address.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50,
      alpha: 0.5
    }],
    polyline: [{       //路线 指定一系列坐标点，从数组第一项连线至最后一项
      points: [{
        longitude: 0,
        latitude: 0
      }, {
        longitude: 0,
        latitude: 0
      }],
      color:"#13a0f7",
      width: 2,
      dottedLine: true
    }],
    meridian: '',
    weft: '',
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    imgIndex: 1,
    phoneArr: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title: '住宿详情页'})
    this.setData({
      'hotels': JSON.parse(options.hotel_info)
    })
    this.setData({
      'phoneArr': this.data.hotels.tel.split(';')
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
  // 查看地图
  lookMapFn (e) {
    var l = e.currentTarget.dataset.location.split(',')
    var self = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        self.setData({
          "polyline[0].points[0].longitude": longitude,
          'polyline[0].points[0].latitude': latitude,
          "polyline[0].points[1].longitude": l[0],
          'polyline[0].points[1].latitude': l[1]
        })
      }
    })
    self.setData({
      "isShowPop.bol": true,
      "isShowPop.title": self.data.hotels.name,
      "isShowPop.type": 'map',
      'markers[0].longitude': l[0],
      'markers[0].latitude': l[1],
      'meridian': l[0],
      'weft': l[1]
    })
    this.animationFn(1)
  },
  // 关闭弹窗
  closeFn () {
    this.setData({
      "isShowPop.bol": false
    })
    this.animationFn(0)
  },
  animationFn: function(op){
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.opacity(op).step()
    this.setData({
      animationData:animation.export()
    })    
  },
  /**
   * 轮播图切换触发事件
  **/
  swiperchange: function(e) {
    this.setData({
      'imgIndex': e.detail.current + 1
    })
  },
  /**
   * 弹窗提示打电话事件
  **/
  makeTipPhone: function(e) {
    var self = this
    wx.showModal({
      title: '你是否要拨打此电话',
      content: e.currentTarget.dataset.phone,
      confirmColor: '#FFD102',
      success: function(res) {
        if (res.confirm) {
          self.makePhone(e.currentTarget.dataset.phone)
        }
      }
    })
  },
  /**
   * 打电话事件
  **/
  makePhone: function(p) {
    wx.makePhoneCall({
      phoneNumber: p
    })
  }
})