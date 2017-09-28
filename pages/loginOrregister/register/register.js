var app = getApp()
Page({
  data: {
    isChecked: false,
    checkbox: '',
    phone: '',
    name: '',
    password:'',
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
  // 验证手机号
  validatePhone: function(event){
    if (event.detail.value == 0) {
      app.showToast('请输入手机号','success',1500)
      return false
    }
    if (event.detail.value.length != 11) {
      app.showToast('手机号长度有误', 'success', 1500)
      return false
    } 
    var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!phonereg.test(event.detail.value)){
      app.showToast('手机号有误', 'success', 1500)
      return false
    }
    return true
  },
  // 验证邮箱
  validateEmail: function(e){
    var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!emailreg.test(e.detail.value)){
      app.showToast('请输入正确邮箱', 'success', 1500)
    }
  },
  // 验证用户名
  validateName: function(e){
    if (e.detail.value.length>10){
      app.showToast('用户名过长', 'success', 1500)
    }
  },
  formSubmit: function(e) {
    // console.log(e)
    var phone = e.detail.value.phone,
        name = e.detail.value.name,
        email = e.detail.value.email,
        password = e.detail.value.password,
        checkPassword = e.detail.value.checkPassword
    if (phone.length == 0 || name.length == 0 || password.length == 0 || email.length == 0 || checkPassword.length == 0) {
      app.showToast('请输入完整信息', 'success', 1500)
    } else if (password != checkPassword) {
      app.showToast('密码不一样', 'success', 1500)
    } else if (phone != null && name != null && email != null && password != null && checkPassword != null && this.data.isChecked == false) {
      app.showToast('请勾选协议', 'success', 1500)
    } else {
      var formData = e.detail.value
      // console.log(formData)
      var openid = wx.getStorageSync('user')
      var token = wx.getStorageSync('token')
      wx.request({
        url: 'https://cpc.find360.cn/api/home/wx/register',
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password,
          repassword: checkPassword,
          openid: openid,
          _token: token
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          '_token': token,
          'X-CSRF-TOKEN': token,
          'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          if (res.data == 101) {
            app.showToast('用户名存在', 'success', 1500)
          } else if (res.data == 102) {
            app.showToast('邮箱存在', 'success', 1500)
          } else if (res.data == 200) {
            app.showToast('注册成功', 'success', 1500)
          } else if (res.data == 300) {
            app.showToast('微信号已被绑定', 'success', 1500)
          } else if (res.data == 400) {
            app.showToast('两次密码不一致', 'success', 1500)
          }
        }
      })
    }
  }
})