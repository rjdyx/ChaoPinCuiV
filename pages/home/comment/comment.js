// pages/home/comment/comment.js
import API from '../../../utils/api.js';
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    https: 'https://cpc.find360.cn/',
    height: 20,
    focus: false,
    stars: [0, 20, 40, 60, 80],
    normalSrc: '../../../../image/star2.png',
    selectedSrc: '../../../../image/全星.png',
    halfSrc: '../../../../image/半星.png',
    key: 0 ,//评分,
    isUserName: true,
    userNameCol: '#ff713f', //默认匿名
    options: {},
    imgArr: []
  },
  formSubmit: function(e){
    console.log(e.detail.value)
    console.log(this.data.key)
    console.log(this.data.isUserName)
    console.log(APP.globalData.userInfo)
    var form = {
      product_id: this.data.options.id,
      content: e.detail.value.content,
      level: this.data.key,
      img: '',
      isUserName: this.data.userNameCol === '#ff713f' ? 0 : 1, // 匿名：不匿名,
      user_id: APP.globalData.userInfo.id,
      openid:APP.globalData.userInfo.openid
    }
    for(var key in form){
      if(key === 'product_id' || key === 'content' || key === 'level' || key === 'user_id' || key === 'openid' ){
        console.log(key + ":" +form[key])
        if (!form[key]){
          console.log('请输入' + key)
          return true
        }
      }
    }
    console.log(form)
    APP.requestData(API.comment, form, (err, data) =>{
      console.log('product---')
      console.log(data)
      if (data) {
        wx.navigateBack({
          delta: 1
        })
      }
    },'POST')
  },
  selectLeft: function (e) {
    console.log(2333)
    var key = e.currentTarget.dataset.key
    if (this.data.key == 10 && e.currentTarget.dataset.key == 10) {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "options": options
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
  
  },
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
  }
})