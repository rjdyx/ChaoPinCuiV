//app.js
import wxValidate from 'utils/wxValidate'
App({
    globalData: {
        openid: '',
        bindState: false, 
        apiUrl: 'https://cpc.find360.cn',
        userInfo: {id: null, openid: null, name: '', nickName: '', avatarUrl: '', sex: 0},//用户登录存储对象
        loginUrl: 'pages/loginOrregister/login/login'
    },
    WxValidate: (rules, messages) => new wxValidate(rules, messages),
    onLaunch: function () {
        var that = this
        var user = wx.getStorageSync('user')
        var userInfo = wx.getStorageSync('userInfo')
        if (user === '') {
            wx.login({
                success: function(res){
                    if (res.code) {
                        var objz = {}
                        var l = 'https://cpc.find360.cn/get/openid?js_code=' + res.code
                        wx.request({
                            url: l,
                            data: {},
                            method: 'GET',
                            success: function(res) {
                                wx.setStorageSync('user', res.data.openid)
                            }
                        })
                        wx.getUserInfo({
                            success: function(res) {
                                objz.avatarUrl = res.userInfo.avatarUrl
                                objz.nickName = res.userInfo.nickName
                                objz.sex = res.userInfo.gender
                                that.check(objz)
                            }
                        })
                    }
                }
            })
        } else {
            this.globalData.openid = user
            this.globalData.userInfo = userInfo
            that.check(userInfo)
        }
        // var state = that.globalData.loginState
        // wx.setStorageSync('loginState', state)
        // wx.request({
        //     url: 'https://cpc.find360.cn/token',
        //     success: function(res){
        //         wx.setStorageSync('token', res.data)
        //     }
        // })
        // wx.request({
        //     url: 'https://cpc.find360.cn/auth',
        //     success: function(res){
        //     }
        // })
    },
    check: function (obj) {
        var that = this
        var openUserId = wx.getStorageSync('user')
        wx.request({
            url: 'https://cpc.find360.cn/api/home/wx/check',
            method: 'GET',
            header:{
                "Content-Type": "application/json"
            },
            data:{
                openid: openUserId
            },
            success: function(res) {
                if (res.data !== 400 && res.data !== 500) {
                    obj.id = res.data.id
                    obj.name = res.data.name
                    obj.nickName = res.data.real_name
                    obj.openid = res.data.openid
                    obj.sex = res.data.sex
                    wx.setStorageSync('userInfo', obj)
                    that.globalData.userInfo = obj
                } else {
                    setTimeout(function() {
                        wx.setStorageSync('userInfo', obj)
                        that.globalData.userInfo = obj
                        wx.navigateTo({
                            url: '../../../pages/loginOrregister/loginOrigister/loginOrigister',
                        })
                    },300)
                }
            }
        })
    },
    checkLoginInfo: function(url){
        if (this.globalData.userInfo==null) {
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
    },
    // 经纬度距离(纬度，经度)
    getDistince: function(lat1, lng1, lat2, lng2){
        var radLat1 = lat1 * Math.PI / 180.0
        var radLat2 = lat2 * Math.PI / 180.0
        var a = radLat1 - radLat2
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
        s = s * 6378.137
        s = Math.round(s * 10000) / 10000
        return s
    },
    // 取整十位数
    shiDataFun: function (data) {
        var newData
        var s = parseInt(data/10)
        var y = data%10
        if (y>=5) {
            newData = s*10+10
        } else {
            newData = s*10
        }
        return newData
    }
})