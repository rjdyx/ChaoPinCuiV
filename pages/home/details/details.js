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
    proInfo: {},        //产品基础信息
    proComment: [],     //评论信息
    proRecommend: [],   //自定义数据
    proImgs: [],        //产品图片列表
    nearbysProList: [], //附近产品列表
    tabArr: ['详情', '图片', '附近'],
    arrBox: {'美食': '相似', '景点': '附近', '工艺': '相似', '茶叶': '同种'},
    star: '',
    isShowPop: {bol: false, type: 'source', title: ''},
    ifLove: false,
    loveUrl: '../../../image/no_love.png',
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
    other: [],        //其他人还看了
    storageFoots: [], // 足迹缓存
    options:{},       // 页面传入的参数,
    comNum: 1,        //页数
    isLoading: false,
    proLoadList: [],
    totalCom: 0,
    totalPage: 0,
    isImgBlowUp: false, // 是否图片放大
    ImgBlowUpUrl: '',   // 图片放大的那张地址
    imgNum: '',
    ImgBlowUpIndex: {bigi: 0, smalli: 0},
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    isShowComment: false, //是否显示评论页        //放大图片下标
    animationData: {},
    current: 0,            //放大图片下标
    curLat: '',
    curLog: ''
  },
  // tab切换
  changeTabIndexFn(e) {
    var self = this
    if (e.target.dataset.id === 1) {
      if (this.data.options.id !== 'undefined' && !this.data.proImgs.length){
        // 获取产品图片
        APP.requestData(API.proImgs, {product_id: this.data.options.id}, (err, data) =>{
          if (data != undefined) {
            this.setData({
              "proImgs": data
            })
          } 
        })
      }
    } else if (e.target.dataset.id === 2) {
      if (this.data.options.id !== 'undefined' && !this.data.nearbysProList.length){
        // 获取附近产品
        APP.requestData(API.nearbysPro, {id: this.data.options.id}, (err, data) =>{
          if (data != undefined) {
            self.setData({
              "nearbysProList": data.data
            })
            self.data.nearbysProList.forEach((objItem, i) => {
              self.data.nearbysProList[i].dis = APP.getDistince(self.data.nearbysProList[i].weft,self.data.nearbysProList[i].meridian,self.data.curLat,self.data.curLog).toFixed(2)
            })
            self.setData({
              "nearbysProList": self.data.nearbysProList
            })
          }
        })
      }
    } else if (e.target.dataset.id === 0) {
      if (this.data.proInfo.length){
        this.getPro()
      }
    }
    // 其他人还看了 
    if (!this.data.other.length) {
      APP.requestData(API.other, {category_id: this.data.proInfo.category_id}, (err, data) =>{
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
    var url = ''
    switch (e.currentTarget.dataset.url) {
      case 'details':
        url = '../details/details?id=' + e.currentTarget.dataset.id
        wx.redirectTo({
          url: url
        })
        break
      case 'products_list':
        url = '../products_list/products_list?id=' + this.data.proInfo.id + '&category_id=' + this.data.proInfo.category_id 
            + '&parent_id=' + this.data.proInfo.parent_id + '&type=nearby' + '&name=更多附近' + this.data.proInfo.parent_name
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
        break
      case 'comment':
        url = '../comment/comment?id=' + this.data.options.id + '&parent_name=' + this.data.proInfo.parent_name 
        wx.navigateTo({
          url: url
        })
        break
    }
  },
  // 收藏
  loveFn: function(e){
    if (APP.globalData.userInfo.id == null || APP.globalData.userInfo.id == undefined || APP.globalData.userInfo.id == '') {
      wx.redirectTo({
        url: '../../loginOrregister/loginOrigister/loginOrigister',
      })
    } else {
      if (this.data.loveUrl == '../../../image/no_love.png') {
        this.setData({
          'loveUrl': '../../../image/love.png',
          'ifLove': true
        })
      } else {
        this.setData({
          'loveUrl': '../../../image/no_love.png',
          'ifLove': false
        })
      }
      APP.requestData(API.collect, { openid: APP.globalData.userInfo.openid, user_id: APP.globalData.userInfo.id, product_id: this.data.options.id, type: this.data.ifLove }, (err, data) => {
        if (data != undefined) {
          if (this.data.loveUrl == '../../../image/love.png') {
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '取消收藏',
              image: '../../../image/gth.png',
              duration: 1000
            })
          }
        }
      })
    }
    
  },  
  getPro: function() {
    var self = this
    // 获取产品详情数据
    if (this.data.options.id !== 'undefined'){
      APP.requestData(API.proDetails, {id: this.data.options.id, user_id: APP.globalData.userInfo.id}, (err, data) =>{
        if (data != undefined) {
          for (var i in data.comment.data){
             data.comment.data[i].img = (data.comment.data[i].img !== null && data.comment.data[i].img !== '') ? data.comment.data[i].img.split(',') : []
          }
          if (data.info.meridian) {
            self.getLocation()
          }
          self.setData({
            "proInfo": data.info,
            "tabArr": [data.info.parent_name + '详情', data.info.parent_name + '图片', self.data.arrBox[data.info.parent_name] + data.info.parent_name],
            "proComment": data.comment.data,
            "proRecommend": data.recommend,
            "totalCom": data.comment.total,
            "totalPage": data.comment.last_page,
            "allLevel": data.totalComment,
            "star": self.getStar(data.info.star_rate)
          })
          self.footprintStorage()
          var l = APP.shiDataFun(Math.ceil(parseInt(self.data.allLevel)/self.data.totalCom))
          self.setData({
            "proInfo.level":  isNaN(l) ? 0 : l,
            "loveUrl": data.info.is_collect ? '../../../image/love.png' : '../../../image/no_love.png'
          })
          wx.setNavigationBarTitle({title: self.data.proInfo.category_name})
        }
      })
    }   
  },
  // 获取评分星级
  getStar: function(star_rate) {
    var star = ''
    for(var i=0; i<star_rate; i++) {
      star += 'A'
    }
    return star
  },
  // 图片放大
  imgBlowUpFn: function(e) {
    var i1 = e.currentTarget.dataset.bigi
    var i2 = e.currentTarget.dataset.smalli
    this.setData({
      'ImgBlowUpIndex.bigi': i1,
      'ImgBlowUpIndex.smalli': i2,
      'isImgBlowUp': e.currentTarget.dataset.bol,
      'current': i2 
      // ,
      // 'imgNum': e.currentTarget.dataset.bol ? (i2 + 1) + '/' + this.data.proComment[i1].img.length : 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.setData({
      "options": options
    })
  },
  /*
   * 获取当前地理位置
   */
  getLocation: function () {
    var _this = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        _this.data.curLat = res.latitude //纬度
        _this.data.curLog = res.longitude //经度
      }
    })
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
        if (res.data !== undefined)  {
          _this.setData({
            "storageFoots": res.data
          })
          _this.setStorageFoots()
        } else {
          _this.setStorageFoots()
        }
      },
      fail: function () {
        _this.setStorageFoots()
      }
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
    if (datas.length !== 0) {
      var flag = false
      for (var i in datas) {
        if (datas[i].id === info.id) {
          datas.splice(i,1)
          datas.unshift(info)
          flag = true
        }
      }
      if (!flag) {
        datas.unshift(info)
      }
    } else {
      datas.unshift(info)
    }
    wx.setStorage({
      key:"footprint",
      data: datas
    })
  },
  aaaa: function() {
    window.location.href = 'http://www.baidu.com'
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      'comNum': 1
    })
    this.getPro()
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
    if (this.data.comNum < this.data.totalPage) {
      this.setData({
        'isLoading': true,
        'comNum': ++this.data.comNum
      })
      this.getReload(this.data.comNum)
    }
  },

  getReload: function (comNum) {
    var that = this
     APP.requestData(API.commentReload, {id: this.data.options.id, page: comNum}, (err, data) =>{
        if (data != undefined) {
          for (var i in data.data){
             data.data[i].img = (data.data[i].img !== null && data.data[i].img !== '') ? data.data[i].img.split(',') : []
          }
          that.setData({
            'isLoading': false, 
            "proComment": this.data.proComment.concat(data.data)
          })
        }
      })
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
    this.animationFn(1)
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
    this.animationFn(1)
  },
  // 关闭弹窗
  closeFn () {
    this.setData({
      "isShowPop.bol": false
    })
    this.animationFn(0)
  },
  // 地图方法
  gionchange(e) {
  },
  markertap(e) {
  },
  controltap(e) {
  },
  // 发布评论
  putOutCommentFn:function(){
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
  }
})