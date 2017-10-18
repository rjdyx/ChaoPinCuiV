// pages/person/person/person.js
var app = getApp()
import API from '../../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  apiUrl: app.globalData.apiUrl,
  data: {
    categoryUrl: '../../home/category/category',
    navs: [
      { navIcon: 'likeIcon', name: '我的收藏', typeId: 0, url: 'collect' },
      { navIcon: 'footIcon', name: '我的足迹', typeId: 1, url: 'footprint' },
      { navIcon: 'evaluate', name: '我的评价', typeId: 2, url: 'evaluate' },
      { navIcon: 'ideasIcon', name: '意见反馈', typeId: 3,url: 'feedback' },
    ],
    knows: [
      { knowicon: 'aboutIcon', name: '关于我们', typeId: 0,url:'aboutUs' },
      { knowicon: 'bindIcon', name:'绑定手机',typeId: 1,url:'bindPhone'},
      { knowicon: 'password', name:'修改密码',typeId: 2,url:'resetPass'}
    ],
    interset: [],
    img:'',
    name: '',
    bindLogin: '',
    userId: '',
    openid: ''
  },
  // 编辑个人信息
  toEdit: function() {
    wx.navigateTo({
      url: '../../personComponent/editMsg/editMsg'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否登录
    if (app.globalData.userInfo.id == null || app.globalData.userInfo.id == undefined) {
      wx.redirectTo({
        url: '../../loginOrregister/loginOrigister/loginOrigister',
      })
    } else {
      this.setData({
        userId: app.globalData.userInfo.id
      })
      this.initData()
    }
  },
  // 预加载函数
  initData: function() {
    var userId = this.data.userId
    if (userId!= '' && userId!=undefined) {
      this.login(userId)
    }
    // 其他人还看了
    app.requestData(API.categoryRand, {}, (err, data) =>{
      if (data != undefined) {
        this.setData({
          "interset": data.data
        })
      }
    })
  },
  catchTo: function(e){
    var data = e.currentTarget.dataset.url
    if (data == 'collect') {
      wx.switchTab({
        url: '../../personComponent/' + data + '/' + data
      })
    } else {
      wx.navigateTo({
        url: '../../personComponent/' + data + '/' + data,
      })
    }
    
  },
  login: function(userId) {
    var that = this
    wx.request({
      url: that.apiUrl+'/api/home/user/' + userId + '/edit',
      success: function (res) {
        that.setData({
          img: 'https://cpc.find360.cn/' + res.data.img,
          name: res.data.name
        })
        that.setData({
          bindLogin: '解除绑定'
        })
      }
    })
  },
  loginState: function(e) {
    var that = this
    var userId = this.data.userId
    if (userId!= '' && userId != undefined) {
      this.logouts(userId)
    } else {
      this.logins()
    }
  },
  logins: function() {
    wx.navigateTo({
      url: '../../loginOrregister/login/login'
    })
  },
  logouts: function(userId) {
    var that = this
    wx.request({
      url: 'https://cpc.find360.cn/api/home/wx/relieve',
      data: {user_id: userId},
      success: function(res){
        app.showToast('解除绑定成功','../../../image/pass.png',1500)
        that.setData({
          bindLogin: '绑定账户',
          img: '' ,
          name: '',
          userId: '',
          openid: ''
        })
        app.globalData.userInfo = {
          id : '',
          name : '',
          openid: ''              
        }
        setTimeout(function(){
          app.homeUrl()
        },1000)
      }
    })
  },
  interestFn: function(){
    console.log(55555)
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
    this.initData()
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