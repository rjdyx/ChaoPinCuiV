//app.js
import wxValidate from 'utils/wxValidate'
App({
  globalData: {
    openid: '',
    bindState: false, 
    apiUrl: 'https://cpc.find360.cn',
    userInfo: {id: null, openid: null, name: ''},//用户登录存储对象
    loginUrl: 'pages/loginOrregister/login/login'
  },
  WxValidate: (rules, messages) => new wxValidate(rules, messages),
  onLaunch: function () {
     var that = this
     var user = wx.getStorageSync('user') || {}
     var userInfo = wx.getStorageSync('userInfo') || {}
     if (user.openid == null) {
        wx.login({
          success: function(res){
            if (res.code) {
              wx.getUserInfo({
                success: function(res) {
                  var objz= {}
                  objz.avatarUrl = res.userInfo.avatarUrl
                  objz.nickName = res.userInfo.nickName
                  wx.setStorageSync('userInfo', objz)
                }
              })
              var d = that.globalData
              var l = 'https://cpc.find360.cn/get/openid?js_code=' + res.code
              wx.request({
                url: l,
                data: {},
                method: 'GET',
                success: function(res) {
                  var openid = res.data.openid
                  wx.setStorageSync('user', openid)
                  wx.request({
                    url: 'https://cpc.find360.cn/api/home/wx/check',
                    method: 'GET',
                    header:{
                      "Content-Type": "application/json"
                    },
                    data:{
                      openid: res.data.openid
                    },
                    success: function(res) {
                      if (res.data != 400) {
                        that.globalData.userInfo = {
                          id : res.data.id,
                          name : res.data.name,
                          openid: res.data.openid
                        }
                      } else {
                        wx.navigateTo({
                          url: '../../../pages/loginOrregister/loginOrigister/loginOrigister',
                        })
                      }
                    }
                  })
                }
              })
            }
          }
        })
     }
     var state = that.globalData.loginState
     wx.setStorageSync('loginState', state)
     wx.request({
       url: 'https://cpc.find360.cn/token',
       success: function(res){
         wx.setStorageSync('token', res.data)
       }
     })
     wx.request({
       url: 'https://cpc.find360.cn/auth',
       success: function(res){
       }
     })
  },
  checkLoginInfo: function(url){
    if (this.globalData.userInfo==null){
      return url
    } else {
      return ''
    }
  },
  getCurrentUrl: function () {//获取当前页面全路径
    var url = getCurrentPages()[getCurrentPages().length - 1].__route__;
    url = url.replace("pages/person/person/person", "..");//替换路径全路径。修改该路径为相对路径
    return url;
  },
  // 弹出框
  showToast: function (title,icon,duration) {
    wx.showToast({
      title: title,
      image: icon,
      duration: duration
      })
},
  requestData:function(url,params,callback,method) {
    wx.request({
      url: url,
      data: params,
      method: method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'Content-Type':'application/json'}, // 设置请求的 header
      success: function(res){
        callback(null,res.data);
      },
      fail: function(e) {
        callback(e)
      }
    })
  },
  // 跳转到首页
  homeUrl: function () {
    wx.reLaunch({
      url: '../../home/home/home'
    })
  }
})