//app.js
App({
  globalData: {
    openid: '',
    bindState: false, 
    userInfo: null,//用户登录存储对象
    loginUrl: 'pages/loginOrregister/login/login'
  },
  onLaunch: function () {
     var that = this
     var user = wx.getStorageSync('user') || {}
     var userInfo = wx.getStorageSync('userInfo') || {}
     if (user.openid == null) {
        wx.login({
          success: function(res){
            // console.log(res)
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
              // console.log(d)
              var l = 'https://cpc.find360.cn/get/openid?js_code=' + res.code
              wx.request({
                url: l,
                data: {},
                method: 'GET',
                success: function(res) {
                  // console.log(res)
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
                      // console.log(res)
                      if (res.data != 400) {
                        that.globalData.userInfo = {
                          id : res.data.id,
                          openid: res.data.openid
                        }
                      } else {
                        wx.navigateTo({
                          url: '../../../pages/loginOrregister/loginOrigister/loginOrigister',
                        })
                      }
                      console.log(that.globalData.userInfo)
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
         console.log(res)
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
  //多张图片上传
  uploadimg: function(data){
    var that= this,
    i=data.i ? data.i : 0,
    success=data.success ? data.success : 0,
    fail=data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'fileData',
      formData: null,
      success: (resp) => {
        success++;
        console.log(i);
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;
        if (i == data.path.length) {   
          //当图片传完时，停止调用 
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {
          //若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    })
  },
  // 弹出框
  showToast: function (title,icon,duration) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
      })
},
  requestData:function(url,params,callback,) {
    wx.request({
      url: url,
      data: params,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'Content-Type':'application/json'}, // 设置请求的 header
      success: function(res){
        callback(null,res.data);
      },
      fail: function(e) {
        callback(e)
      }
    })
  }
})