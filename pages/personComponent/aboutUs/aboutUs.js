// pages/personComponent/contact/contact.js
Page({
   calling:function(){
     wx.makePhoneCall({
       phoneNumber: '020-4821647',
       success:function(){
         console.log('成功')
       },
       fail:function() {
         console.log('失败')
       }
     })
   }
})