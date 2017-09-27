// pages/common/pages/products_list/products_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [
        {
          src: '../../../../image/潮州旅游_03.png',
          proName: '牌坊街牌坊街牌坊街牌坊街牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        }
      ],
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
    // 跳页面
  jumpFn: function(e){
    wx.navigateTo({
      url: '../details/details'
    })
  }
})