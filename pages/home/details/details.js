// pages/home/details/details.js
const APP = getApp();
const util = require('../../../utils/util.js');  
import API from '../../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    https: 'https://cpc.find360.cn/',
    categoryUrl: '../category/category',
    tabIndex: 0,
    proInfo: {}, //产品基础信息
    proComment: [], //评论信息
    proRecommend: [], //自定义数据
    proImgs: [], //产品图片列表
    nearbysProList: [], //附近产品列表
    tabArr: ['景点详情', '景点图片', '附近景点'],
    star: 'AAAA',
    isShowPop: {bol: false, type: 'source', title: ''},
    ifLove: false,
    loveUrl: '../../../image/no_love.png',
    markers: [{ //标记点
      iconPath: "../../../image/location_address.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50,
      alpha: 0.5
    }],
    polyline: [{ //路线 指定一系列坐标点，从数组第一项连线至最后一项
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
    other: [],//其他人还看了
    storageFoots: [], // 足迹缓存
    options:{} // 页面传入的参数
  },
  // tab切换
  changeTabIndexFn(e) {
    var self = this
    console.log(e.target.dataset.id)
    if (e.target.dataset.id === 1) {
      if (this.data.options.id !== 'undefined' && !this.data.proImgs.length){
        // 获取产品图片
        APP.requestData(API.proImgs, {product_id: this.data.options.id}, (err, data) =>{
          console.log('proImgs')
          console.log(data)
          if (data != undefined) {
            this.setData({
              "proImgs": data
            })
          }
        })
      }
    } else if (e.target.dataset.id === 2) {
      if (this.data.options.id !== 'undefined' && self.data.proInfo.meridian && self.data.proInfo.weft && !this.data.nearbysProList.length){
        // 获取附近产品
        APP.requestData(API.nearbysPro, {id: this.data.options.id, lon: self.data.proInfo.meridian, lat: self.data.proInfo.weft}, (err, data) =>{
          console.log('nearbysPro')
          console.log(data)
          if (data != undefined) {
            self.setData({
              "nearbysProList": data.data
            })
          }
        })
      }
    } else if (e.target.dataset.id === 0) {
      if (this.data.proInfo.length){
        this.getPro()
      }
    }
    // 其他人还看了 //id??
    if (!this.data.other.length) {
      APP.requestData(API.other, {category_id: this.data.proInfo.category_id}, (err, data) =>{
        console.log('other---')
        console.log(data)
        if (data != undefined) {
          self.setData({
            "other": data.data
          })
        }
      })
    }
    this.setData({
      "tabIndex": e.target.dataset.id
    })
  },
  jumpFn: function(e){
    console.log(e)
    var url = ''
    switch (e.currentTarget.dataset.url) {
      case 'details':
        url = '../details/details?id=' + e.currentTarget.dataset.id
        break
      case 'products_list':
        url = '../products_list/products_list?id=' + this.data.options.id + '&type=nearby' + '&name=更多附近' + this.data.proInfo.parent_name
        break
      case 'comment':
        url = '../comment/comment?id=' + this.data.options.id
        break
    }
    let pages = getCurrentPages()
    console.log('pages----')
    console.log(pages)
    if (pages.length >= 5) {
        wx.redirectTo({
          url: url
        })
    }else{
      wx.navigateTo({
        url: url
      })
    }
  },
  // 收藏
  loveFn: function(e){
    if (this.data.loveUrl == '../../../image/no_love.png' ){
      this.setData({
        'loveUrl' : '../../../image/love.png',
        'ifLove': true
       })
    } else{
      this.setData({
       'loveUrl' : '../../../image/no_love.png' ,
       'ifLove': false
      })
    }
    APP.requestData(API.collect, {openid: APP.globalData.userInfo.openid, user_id: APP.globalData.userInfo.id, product_id: this.data.options.id, type: this.data.ifLove}, (err, data) =>{
        console.log('collect--')
        console.log(data)
        if (data != undefined) {
          if (this.data.loveUrl == '../../../image/love.png' ){
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration:1000
            }) 
          } else{
            wx.showToast({
              title: '取消收藏',
              image: '../../../image/gth.png',
              duration:1000
            }) 
          }
        }
    })
  },  
  getPro: function() {
    var self = this
    // 获取产品详情数据
    if (this.data.options.id !== 'undefined'){
      APP.requestData(API.proDetails, {id: this.data.options.id}, (err, data) =>{
        console.log('proDetails')
        console.log(data)
        if (data != undefined) {
          self.setData({
            "proInfo": data.info,
            "proComment": data.comment,
            "proRecommend": data.recommend
          })
          self.footprintStorage()
          self.setData({
            "proInfo.level": self.data.proInfo.comment,
            "loveUrl": data.info.is_collect ? '../../../image/love.png' : '../../../image/no_love.png'
          })
          wx.setNavigationBarTitle({title: self.data.proInfo.category_name})
        }
      })
    }   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('details.js-----------------------')
    console.log('options---')
    console.log(options)
    this.setData({
      "options": options
    })
    // 获取产品详情数据
    this.getPro()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  // 足迹存入缓存
  footprintStorage: function () {
    var _this = this
    wx.getStorage({
      key: 'footprint',
      success: function(res) {
        console.log(res.data)
        _this.setData({
          "storageFoots": res.data
        })
        _this.setStorageFoots()
      },
    })
  },
  setStorageFoots: function () {
    var _this = this
    var datas = []
    var info = {}
    info['datetime'] = util.formatTime(new Date())
    info['img'] = this.data.proInfo.img
    info['id'] = this.data.proInfo.id
    info['name'] = this.data.proInfo.name
    info['desc'] = this.data.proInfo.desc
    info['comment'] = this.data.proInfo.comment
    datas = this.data.storageFoots
    datas.unshift(info)
    if (datas.length > 50) {
      datas.pop()
    }
    wx.setStorage({
      key:"footprint",
      data: datas
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(66666666)
    this.getPro()
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
  // 查看跟多历史
  lookSourceFn () {
    this.setData({
      "isShowPop.bol": true,
      "isShowPop.title": this.data.proInfo.name + '历史来源',
      "isShowPop.type": 'source'
    })
    console.log('this.data.isShowPop----')
    console.log(this.data.isShowPop)
    console.log(this.data.proInfo.desc)
  },
  // 查看地图
  lookMapFn () {
    var self = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log('longitude:' + longitude)
        console.log('latitude:' + latitude)
        self.setData({
          "polyline[0].points[0].longitude": longitude,
          'polyline[0].points[0].latitude': latitude,
          "polyline[0].points[1].longitude": self.data.proInfo.meridian,
          'polyline[0].points[1].latitude': self.data.proInfo.weft
        })
      }
    })
    self.setData({
      "isShowPop.bol": true,
      "isShowPop.title": self.data.proInfo.name,
      "isShowPop.type": 'map',
      'markers[0].longitude': self.data.proInfo.meridian,
      'markers[0].latitude': self.data.proInfo.weft
    })
    console.log('this.data.isShowPop----')
    console.log(self.data.isShowPop)
    console.log(self.data.proInfo)
    console.log(self.data.markers)
    console.log(self.data.polyline)
  },
  // 关闭弹窗
  closeFn () {
    this.setData({
      "isShowPop.bol": false
    })
  },
  // 地图方法
  gionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  // 发布评论
  putOutCommentFn:function(){
    console.log(2525)
  }
})