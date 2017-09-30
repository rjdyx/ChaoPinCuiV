// pages/person/person/person.js
var app = getApp()
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryUrl: '../../home/category/category',
    navs: [
      { navIcon: 'likeIcon', name: '我的收藏', typeId: 0, url: 'collect' },
      { navIcon: 'footIcon', name: '我的足迹', typeId: 1, url: 'footprint' },
      { navIcon: 'evaluate', name: '我的评价', typeId: 2, url: 'evaluate' },
      { navIcon: 'ideasIcon', name: '意见反馈', typeId: 3,url:'feedback' },
    ],
    knows: [
      { knowicon: 'aboutIcon', name: '关于我们', typeId: 0,url:'aboutUs' },
      { knowicon: 'bindIcon', name:'绑定手机',typeId: 1,url:'bindPhone'},
      { knowicon: 'bindIcon', name:'修改密码',typeId: 2,url:'resetPass'}
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
  onLoad: function () {
    // 获取当前页面的路径
    var url = getCurrentPages()[getCurrentPages().length - 1].__route__;
    this.setData({
      userId: app.globalData.userInfo.id
    })
    var userId = this.data.userId
    if (userId!= '' && userId!=undefined) {
      this.login(userId)
    }
        // 其他人还看了
    app.requestData(API.categoryRand, {}, (err, data) =>{
      console.log('interset---')
      console.log(data)
      console.log(data != undefined)
      if (data != undefined) {
        this.setData({
          "interset": data.data
        })
        console.log('this.data.interset')
        console.log(this.data.interset)
      }
    })
  },
  login: function(userId) {
    var that = this
    wx.request({
      url: 'https://cpc.find360.cn/api/home/user/' + userId + '/edit',
      success: function (res) {
        console.log('user--')
        console.log(res)
        that.setData({
          img: res.data.img,
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
        app.showToast('解除绑定成功', 'success', 1500)
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
    // 上一个页面返回此页面立即刷新数据
    var that = this
    var mydata = wx.getStorageSync('mydata')
    console.log(mydata.name)
    if (mydata != null||mydata !=undefined) {
      that.setData({
        img: mydata.img,
        name: mydata.name
      })
    }
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