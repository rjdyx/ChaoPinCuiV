// pages/home/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      '../../../image/IMG_20170814_180916.jpg',
      '../../../image/eg.png',
      '../../../image/IMG_20170814_180916.jpg'],
  autoplay: true,
  interval: 3000,
  duration: 1000,
  navs: [
    {icon: '../../../image/foods.png', name: '美食', typeId: 0 },
    {icon: '../../../image/spot.png', name: '景点', typeId: 1 },
    {icon: '../../../image/art.png', name: '文艺', typeId: 2 },
    {icon: '../../../image/technique.png',name: '工艺', typeId: 3},
  ],
  list: [
    { icon: '../../../image/eg.png', name: '手打牛肉丸', typeId: 0 },
    { icon: '../../../image/eg.png', name: '广济桥', typeId: 1 },
    { icon: '../../../image/eg.png', name: '潮剧', typeId: 2 },
    { icon: '../../../image/eg.png', name: '木雕', typeId: 3 },
  ],
  },
  catchTapCategory: function () {
     wx.navigateTo({
       url:'../../loginOrregister/loginOrigister/loginOrigister'
     })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'http://cpc.find360.cn/api/home/index/categorys', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
      }
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
  
  }
})