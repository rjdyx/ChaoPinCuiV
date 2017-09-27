Page({
  data: {
    isChecked: false,
    checkbox: '',
    phone: '',
    name: '',
    password:'',
    codeText: '获取验证码',
    sendmsg: 'nosend'
  },
  onload: function(){
  },
  checkboxChange: function(e){
    console.log(e.detail.value)
    if (e.detail.value != '') {
      this.setData({
        isChecked: true
      })
    } else {
      this.setData({
        isChecked: false
      })
    }
  },
  getCode: function(e){
    if (timer == 1){
      var timer = 0
      var that = this
      var time = 60
      this.setData({
        sendmsg: 'hassend'
      })
      var inter = setInterval(function(){
        that.setData({
          codeText: 'time' + 's后重新发送',
        })
        time--
        if (time < 0) {
          clearInterval(inter)
          this.setData({
            codeText: '获取验证码'
          })
        }
      },1000)
    }
    wx.showToast({
      title: '验证码已发送',
      icon: 'success',
      duration: 2000
    })
  },
  // 验证手机号
  validatePhone: function(event){
    if (event.detail.value == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'success',
        duration: 1500
      })
      return false
    }
    if (event.detail.value.length != 11) {
      wx.showToast({
        title:'手机号长度有误',
        icon:'success',
        duration:1500
      })
      return false
    } 
    var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!phonereg.test(event.detail.value)){
      wx.showToast({
        title:'手机号有误',
        icon: 'success',
        duration:1500
      })
      return false
    }
    return true
  },
  // 验证邮箱
  validateEmail: function(e){
    var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!emailreg.test(e.detail.value)){
      wx.showToast({
        title: '请输入正确邮箱',
        icon: 'success',
        duration: 1500
      })
    }
  },
  formSubmit: function(e) {
    var phone = e.detail.value.phone,
        name = e.detail.value.name,
        email = e.detail.value.email,
        password = e.detail.value.password,
        checkPassword = e.detail.value.checkPassword
    if (phone.length == 0 || name.length == 0 || password.length == 0 || email.length == 0 || checkPassword.length == 0) {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'success',
        duration:1500
      })
    } else if (password != checkPassword) {
      wx.showToast({
        title: '密码不一样',
        icon: 'success',
        duration: 1500
      })
    }
  }
})