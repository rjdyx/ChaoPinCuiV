// pages/person/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [
      { navIcon: 'likeIcon', name: '我的收藏', typeId: 0, url: 'collect' },
      { navIcon: 'footIcon', name: '我的足迹', typeId: 1, url: 'footprint' },
      { navIcon: 'evaluate', name: '我的评价', typeId: 2, url: 'evaluate' },
      { navIcon: 'ideasIcon', name: '意见反馈', typeId: 3,url:'feedback' },
    ],
    knows: [
      { knowicon: 'aboutIcon', name: '关于我们', typeId: 0,url:'aboutUs' },
      { knowicon: 'bindIcon', name:'绑定手机',typeId: 1,url:'bindPhone'},
    ],
    interset: [
      { name: '特色美食', typeId: 0 },
      { name: '风味小吃', typeId: 1 },
      { name: '工艺', typeId: 2 },
      { name: '茶叶', typeId: 3 },
      { name: '茶馆', typeId: 4 },
      { name: '明信片', typeId: 5 }
    ],
    userInfo:{},
    bindLogin: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getUserInfo()
  },
  // 获取个人信息
  getUserInfo: function(cb){
    var that = this
    wx.login({
      success: function(){
        wx.getUserInfo({
          success: function(res){
            if (res.userInfo.avatarUrl != null && res.userInfo.nickName != null) {
              that.setData({
                bindLogin: '退出登录'
              })
            }
            that.setData({
              userInfo: res.userInfo
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