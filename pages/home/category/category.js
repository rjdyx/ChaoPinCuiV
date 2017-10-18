// pages/home/category/category.js
import API from '../../../utils/api.js';
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    https: 'https://cpc.find360.cn/',
    detailsUrl: '../details/details',
    proListUrl: '../products_list/products_list',
    categoryUrl: './category',
    isShowMC: false,
    scenicCategory: [],
    category: [],               // 推荐分类
    moreCategory: [],           // 更多分类
    product: {},                // 推荐产品对象
    recommend_products_arr: [], // 推荐产品列表
    other: [],                  // 其他人还看了,
    options:{},                 // 接收的参数
    isShowSearch: false,
    searchOp: {},               // 搜索参数对象
    timer: null,
    searchList: []               
  },
  // 跳页面
  jumpFn: function(e) {
    var url = ''
    switch (e.currentTarget.dataset.url) {
      case 'details':  
        this.setData({
          'isShowSearch': false
        })
        url = this.data.detailsUrl + '?id=' + e.currentTarget.dataset.id
        break
      case 'products_list':
        url = this.data.proListUrl + '?id=' + this.data.options.id + '&type=recommend'+ '&name=更多' + this.data.options.name
        break
    }
    wx.navigateTo({
      url: url
    })
  },
  showSearchPageFn: function(){
    this.setData({
      'isShowSearch': true
    })
  },
  // input值改变时触发
  inputChangeFn: function(e) {
    clearTimeout(this.data.timer)
    if (e.detail.value) {
      var timer = setTimeout(() => {
        this.setData({
          "searchOp.id": this.data.options.id,
          // "searchOp.category_id": this.data.options.id,
          "searchOp.type": "search",
          "searchOp.name": e.detail.value
        })
        APP.requestData(API.proList, this.data.searchOp, (err, data) =>{
          if (data != undefined) {
            this.setData({
              "searchList": data.data
            })
          }
        })
      }, 1000)
      this.setData({
        'timer': timer
      }) 
    } else {
      this.setData({
        "searchList": []
      })
    }
  },
  // 搜索
  formSearch: function (e){
    if(e.detail.value.searchName){
      var url = this.data.proListUrl + '?id=' + this.data.options.id + '&type=search'+ '&name=搜索' + this.data.options.name + '&searchName=' + e.detail.value.searchName
      let pages = getCurrentPages()
      if (pages.length >= 5) {
        wx.redirectTo({
          url: url
        })
      }else{
        wx.navigateTo({
          url: url
        })
      }
    } else {
      wx.showToast({
        title: '请输入' + this.data.options.name,
        image: '../../../image/gth.png',
        duration: 2000
      })
    }
  },
  // 取消搜索
  cancelSearchFn: function () {
    this.setData({
      'isShowSearch': false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
        // 获取当前的地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        self.setData({
          "searchOp.lon": res.longitude,  //经度
          "searchOp.lat": res.latitude    //纬度
        })
      }
    })
    if (options) {
      self.setData({
        "options": options
      })
      wx.setNavigationBarTitle({  title: '潮州' + options.name})
    }
    // 当前分类代表性产品数据
    APP.requestData(API.product, {category_id: options.id}, (err, data) =>{
      if (data != undefined) {
        self.setData({
          "product": data
        })
      }
    })
    // 当前分类下的二级分类
    APP.requestData(API.categoryChild, {pid: options.id}, (err, data) =>{
      if (data != undefined) {
        self.setData({
          "category": data
        })
        this.slice6()
      }
    })
    // 榜单推荐（默认6个）
    APP.requestData(API.categoryRecommend, {category_id: options.id, num: 6}, (err, data) =>{
      if (data != undefined) {
        self.setData({
          "recommend_products_arr": data.data
        })
      }
    })
    // 其他人还看了
    APP.requestData(API.other, {category_id: options.id}, (err, data) =>{
      if (data != undefined) {
        self.setData({
          "other": data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  slice6: function() {
    var arr = []
    var arr2 = []
    if (this.data.category.length > 6) {
      arr = this.data.category.slice(0, 6)
      arr2 = this.data.category.slice(6)
      this.setData({
        "category": arr,
        "moreCategory": arr2,
        "isShowMC": true
      })
    }
  },
  // 点击查看更多，或收起
  moreCategoryFn:function(){
    if (this.data.moreCategory.length) {
      if (this.data.isShowMC) {
        this.setData({
          "category": this.data.category.concat(this.data.moreCategory),
          "isShowMC": !this.data.isShowMC
        })
      } else{
        this.setData({
          "category": this.data.category.slice(0, 6),
          "isShowMC": !this.data.isShowMC
        })
      }
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
  
  }
})