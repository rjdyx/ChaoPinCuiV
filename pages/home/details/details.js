// pages/home/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      tabIndex: 0,
      src: '../../../image/潮州旅游_03.png',
      proName: '广济桥',
      proCity: '潮州市',
      proArea: '湘桥区',
      tabArr: ['景点详情', '景点图片', '附近景点'],
      star: 'AAAA',
      source: '当数据改变触发渲染层重新渲染的时候，会校正带有当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。',
      address: '当数据改变触发渲染层重新渲',
      tipText1: '当数据改变触发渲染层重新渲',
      tipTime: '2017/5/2',
      tipMoney: '20RMB',
      tipGo: '当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲',
      score: {
        score: 5.9,
        comment: 523,
        star: 4.5
      },
      userList:[
        {
          image: '../../../image/潮州旅游_03.png',
          userName: 'yoko',
          star: 4.5,
          comment: '当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲',
          imageArr: ['../../../image/潮州旅游_03.png', '../../../image/潮州旅游_03.png', '../../../image/潮州旅游_03.png']
        },
        {
          image: '../../../image/潮州旅游_03.png',
          userName: 'yoko',
          star: 4.5,
          comment: '当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲',
          imageArr: ['../../../image/潮州旅游_03.png', '../../../image/潮州旅游_03.png', '../../../image/潮州旅游_03.png']
        },
        {
          image: '../../../image/潮州旅游_03.png',
          userName: 'yoko',
          star: 4.5,
          comment: '当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲当数据改变触发渲染层重新渲',
          imageArr: ['../../../image/潮州旅游_03.png', '../../../image/潮州旅游_03.png', '../../../image/潮州旅游_03.png']
        }
      ],
      isShowPop: {bol: false, name: ''},
      sourcePop: {
        title: '广州桥历史来源',
        text: '当数据改变触发渲染层重新渲染的时候，会校正带有当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效当数据改变触发渲染层重新渲染的时候，会校正带有当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而当数据改变触发渲染层重新渲染的时候，会校正带有当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保当数据改变触发渲染层重新渲染的时候，会校正带有当数据改变触发渲染层重新渲染的时候，会校正带有的组件，框架会确保他们被重新排序，而不是重新创建，以确保当数据改变触发渲染层重新渲染的时候，会校正带有当数据改变触发渲染层重新渲染的时候，会校正带有的组件，框架会确保他们被重新排序，而不是重新创建，以确保当数据改变触发渲染层重新渲染的时候，会校正带有当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效使组件保持wan'
      },
      markers: [{
        iconPath: "/resources/others.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color:"#FF0000DD",
        width: 2,
        dottedLine: true
      }],
      controls: [{
        id: 1,
        iconPath: '/resources/location.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }],
      tabCon2_arr: [
        {
          url: '../../../image/潮州旅游_03.png',
          title: 'title',
          context: 'context'
        },
        {
          url: '../../../image/潮州旅游_03.png',
          title: 'title',
          context: 'context'
        },
        {
          url: '../../../image/潮州旅游_03.png',
          title: 'title',
          context: 'context'
        },
        {
          url: '../../../image/潮州旅游_03.png',
          title: 'title',
          context: 'context'
        }
      ],
      scenicCategory: ['潮州文乐', '古城景点', '特色景点', '景点住宿', '特色茶馆', '潮州手信'],
      tabCon3_imgTextArr: [
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街牌坊街牌坊街牌坊街牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
          proArea: '湘桥区'
        },
        {
          src: '../../../image/潮州旅游_03.png',
          proName: '牌坊街',
          distance: '湘桥区',
          proCity: '湘桥区',
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
  // 查看跟多历史
  lookSourceFn () {
    this.setData({
      "item.isShowPop.bol": true,
      "item.isShowPop.name": 'source'
    })
  },
  // 查看地图
  lookMapFn () {
    this.setData({
      "item.isShowPop.bol": true,
      "item.isShowPop.name": 'map'
    })
  },
  // 关闭弹窗
  closeFn () {
    this.setData({
      "item.isShowPop.bol": false
    })
  },
  // 地图方法
  gionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  // 发布评论
  putOutCommentFn:function(){
    console.log(2525)
  },
  // tab切换
  changeTabIndexFn(e) {
    // console.log(e)
    this.setData({
      "item.tabIndex": e.target.dataset.id
    })
  },
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