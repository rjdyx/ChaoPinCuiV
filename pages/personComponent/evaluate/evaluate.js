// pages/personComponent/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    prints: [
      { title: '牌坊街', spot: '../../../image/icon8.jpg', spotDesc: '潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市潮州市',icon: '../../../image/home.png' },
      { title: '牌坊街', spot: '../../../image/icon8.jpg', spotDesc: '潮州市' },
      { title: '牌坊街', spot: '../../../image/icon8.jpg', spotDesc: '潮州市' },
      { title: '牌坊街', spot: '../../../image/icon8.jpg', spotDesc: '潮州市' },
      { title: '牌坊街', spot: '../../../image/icon8.jpg', spotDesc: '潮州市' },
    ],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../image/星.png',
    selectedSrc: '../../../image/星_1.png',
    halfSrc: '../../../image/评分半颗五角星.png',
    key: 0,//评分,
  
  },
  selectLeft: function (e) {
    console.log(2333)
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })

  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://cpc.find360.cn/api/home/comment',
      method: 'GET',
      success: function(res){
        console.log(res)
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