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
    prints: [
      { title: '牌坊街', spot: '../../../image/icon8.jpg', spotDesc: '潮州市' },
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
    startX: 0,
    startY: 0,
    isTouchMove: false,
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
    this.data.prints.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      prints: this.data.prints
    })
  },
  itemTo: function () {
    console.log(634489)
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

  }
})