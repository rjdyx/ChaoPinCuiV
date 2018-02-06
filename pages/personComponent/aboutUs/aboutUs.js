// pages/personComponent/contact/contact.js
Page({
  data: {
    phone: '',
    email: ''
  },
  calling:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
      success:function(){
        console.log('成功')
      },
      fail:function() {
        console.log('失败')
      }
    })
  },
   onLoad: function(){
     wx.setNavigationBarTitle({
       title: '联系我们',
     })
     var that = this
     wx.request({
       url: 'https://cpc.find360.cn/api/home/company',
       success: function(res){
         console.log(res)
         that.setData({
           phone:res.data.phone,
           email: res.data.email,
           address: res.data.address
         })
       }
     })
   }
})