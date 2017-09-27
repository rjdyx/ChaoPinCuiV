// pages/home/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 20,
    focus: false,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../../image/star2.png',
    selectedSrc: '../../../../image/全星.png',
    halfSrc: '../../../../image/半星.png',
    key: 0 ,//评分,
    isUserName: true,
    userNameCol: '#ff713f'
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
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
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
  // 改变匿名按钮颜色方法
  changeUserNameColFn: function(){
      this.setData({
        isUserName: !this.data.isUserName
      })
      var col = this.data.isUserName ? "#ff713f" : "#dcdcdc" 
      this.setData({
        userNameCol: col
      })
      console.log(this.data.isUserName)
  }
})