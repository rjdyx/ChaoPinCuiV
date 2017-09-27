// pages/home/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      src: '../../../image/潮州旅游_03.png',
      placeholder: '请输入你想了解的景点',
      scenicCategory: ['潮州文乐', '古城景点', '特色景点', '景点住宿', '特色茶馆', '潮州手信', '古城景点1', '特色景点2', '景点住宿2'],
      moreCategory: [],
      isShowMC: false,
      bgName: '广济桥',
      main_title: '景点推荐',
      recommend_products_arr: [
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街牌坊街牌坊街牌坊街牌坊街',
          proCity: '潮州市',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          proCity: '潮州市',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          proCity: '潮州市',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          proCity: '潮州市',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          proCity: '潮州市',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          proCity: '潮州市',
          proArea: '湘桥区'
        }
      ]
    }
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
    var arr = []
    var arr2 = []
    if (this.data.item.scenicCategory.length > 6) {
      arr = this.data.item.scenicCategory.slice(0, 6)
      arr2 = this.data.item.scenicCategory.slice(6)
      this.setData({
        "item.scenicCategory": arr,
        "item.moreCategory": arr2,
        "item.isShowMC": true
      })
    }
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
  // 点击查看更多，或收起
  moreClassFn:function(){
    if (this.data.item.moreCategory.length) {
      if (this.data.item.isShowMC) {
        this.setData({
          "item.scenicCategory": this.data.item.scenicCategory.concat(this.data.item.moreCategory),
          "item.isShowMC": !this.data.item.isShowMC
        })
      } else{
        this.setData({
          "item.scenicCategory": this.data.item.scenicCategory.slice(0, 6),
          "item.isShowMC": !this.data.item.isShowMC
        })
      }
    }
  },
  // 跳页面
  jumpFn: function(e){
    console.log(e)
    var url = ''
    switch (e.currentTarget.dataset.url) {
      case 'details':
        url = '../details/details'
        break
      case 'products_list':
        url = '../products_list/products_list'
        break
    }
    wx.navigateTo({
      url: url
    })
  }
})