var app = getApp()
import API from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [
      { icon: '../../../image/foods.png', name: '我的收藏', typeId: 0, url: 'collect' },
      { icon: '../../../image/spot.png', name: '我的足迹', typeId: 1, url: 'footprint' },
      { icon: '../../../image/art.png', name: '我的评价', typeId: 2, url: 'evaluate' },
      { icon: '../../../image/technique.png', name: '意见反馈', typeId: 3, url: 'feedback' },
    ],
    apiUrl: app.globalData.apiUrl,
    prints: [],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../image/star2.png',
    selectedSrc: '../../../image/allstar.png',
    halfSrc: '../../../image/halfstar.png',
    key: 0,//评分,
    startX: 0,
    startY: 0,
    isTouchMove: false,
  },
  // 跳转
  productSkip: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../../home/details/details?id='+ e.currentTarget.dataset.pid
    })
  },
  selectLeft: function (e) {
  },
  //点击右边,整颗星
  selectRight: function (e) {
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.prints.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      prints: this.data.prints
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
      that.data.prints.forEach(function (v, i) {
        v.isTouchMove = false
        //滑动超过30度角 return
        if (Math.abs(angle) > 30) return;
        if (i == index) {
          if (touchMoveX > startX) //右滑
            v.isTouchMove = false
          else //左滑
            v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      prints: that.data.prints
    })
  },
  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    var _this = this
    wx.request({
      url: API.collect,
      data: {
        user_id: app.globalData.userInfo.id, 
        product_id: e.currentTarget.dataset.pid,
        type: 'false'
      },
      method: 'get',
      success: function (res) {
        console.log(res)
        if (res.data) {
          _this.data.prints.splice(e.currentTarget.dataset.index, 1)
          _this.setData({
            prints: _this.data.prints
          })
          wx.showToast({
            title: '取消成功',
            icon: 'succes',
            duration: 1000,
            mask:true
          })
        } else {
          wx.showToast({
            title: '取消失败',
            icon: 'succes',
            duration: 1000,
            mask:true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPro()
  },
  getPro: function () {
    //判断是否登录
    if (app.globalData.userInfo.id == null || app.globalData.userInfo.id == undefined) {
      wx.redirectTo({
        url: '../../loginOrregister/loginOrigister/loginOrigister',
      })
    } else {
      // 获取当前页面的路径
      var url = getCurrentPages()[getCurrentPages().length - 1].__route__;
      wx.setStorageSync('currentUrl', url)
      //请求数据
      var _this = this
      _this.getMsg()
    }
  },
  getMsg: function(){
    var that = this
    wx.request({
      url: 'https://cpc.find360.cn/api/home/collect',
      data: {
        openid: app.globalData.userInfo.openid,
        user_id: app.globalData.userInfo.id
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          prints: res.data
        })
      }
    })
  },
  //向下滚动
  lower: function () {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { 
      wx.hideNavigationBarLoading(); 
      that.nextLoad(); 
    }, 1000);
  },
  //向下刷新
  nextLoad: function(){
    var that = this
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    })
    that.getMsg()
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 2000)
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

  }
})