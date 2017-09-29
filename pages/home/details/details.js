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
    score: {
      score: 5.9,
      comment: 523,
      level: 4.5
    },
    isShowPop: {bol: false, name: ''},
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
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
        APP.requestData(API.proImgs + '?product_id=' + this.data.options.id, {}, (err, data) =>{
          console.log('proImgs')
          console.log(data)
          if (data) {
            this.setData({
              "proImgs": data
            })
          }
        })
      }
    } else if (e.target.dataset.id === 2) {
      if (this.data.options.id !== 'undefined' && self.data.proInfo.meridian && self.data.proInfo.weft && !this.data.nearbysProList.length){
        // 获取附近产品
        APP.requestData(API.nearbysPro + '?id=' + this.data.options.id + "&lon=" + self.data.proInfo.meridian + "&lat=" + self.data.proInfo.weft, {}, (err, data) =>{
          console.log('nearbysPro')
          console.log(data)
          if (data.data) {
            self.setData({
              "nearbysProList": data.data
            })
          }
        })
      }
    }
    // 其他人还看了 //id??
    if (!this.data.other.length) {
      APP.requestData(API.other + '?category_id=' + this.data.proInfo.category_id, {}, (err, data) =>{
        console.log('other---')
        console.log(data)
        if (data.data) {
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
        url = '../details/details' + '?id=' + e.currentTarget.dataset.id
        break
      case 'products_list':
        url = '../products_list/products_list?id=' + this.data.options.id + '&type=nearby'
        break
      case 'comment':
        url = '../comment/comment'
        break
    }
    console.log('没错')
    console.log(url)
    wx.redirectTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('details.js-----------------------')
    console.log('options---')
    console.log(options)
    var self = this
    self.setData({
      "options": options
    })
    // 获取产品详情数据
    if (options.id !== 'undefined'){
      APP.requestData(API.proDetails + '?id=' + options.id, {}, (err, data) =>{
        console.log('proDetails')
        console.log(data)
        if (data) {
          self.setData({
            "proInfo": data.info,
            "proComment": data.comment,
            "proRecommend": data.recommend
          })
          self.footprintStorage()
        }
      })
    }   
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
      "isShowPop.name": 'source'
    })
  },
  // 查看地图
  lookMapFn () {
    this.setData({
      "isShowPop.bol": true,
      "isShowPop.name": 'map'
    })
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