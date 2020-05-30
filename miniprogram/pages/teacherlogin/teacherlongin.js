// pages/teacherlogin/teacherlongin.js
import {dbGet, dbAdd } from "../../utils/getDB"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:{
    name:"",
    phone:"",
    email:"",
    addr:"",
    school:"",
    grade:"",
    class:"",

    },
    userRules: [{
      required: true,
      message: '请输入用户名'
    },
    {
      min: 2,
      message: ' 至少2个字以上'
    }
  ],
  otherRules: [
    {
      required: true,
      message: '请认真输入注册信息!'
    },
  {
    min:2,
    message: '请输入完整信息,不少于2个字'
  }
],
  emailRules: {
    type: 'email',
    required: true,
    message:'邮箱输入不正确,请重新输入'
  },
  phoneRules: [{
    type: "string",
    required: true,
  }, {
    pattern: "^1(3|4|5|7|8)\\d{9}$",
    message: '手机号不正确，请重新输入'
  }],
   
  },
  async submit(event){
    // const db = wx.cloud.database();
    const details = event.detail.values;

    console.log(event.detail);
    if(event.detail.isValidate){
     await dbAdd({name:"user",doc:"",data:details});
    await  wx.chooseAddress({
        success (res) {
          dbAdd({name:"user",doc:"",data:res})
          console.log(res.userName)
          console.log(res.postalCode)
          console.log(res.provinceName)
          console.log(res.cityName)
          console.log(res.countyName)
          console.log(res.detailInfo)
          console.log(res.nationalCode)
          console.log(res.telNumber)
        }
      })
     

      wx.showModal({
        title: '注册成功',
        content:"您已经完成了注册流程,本店工作人员会及时与您联系发货!",
        showCancel:false,
        success (res) {
          if (res.confirm) {
          }
        }
      })
      wx.switchTab({
        url:`/pages/my/my`});
    
    
  };
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.lin.initValidateForm(this);
    // getDB({name:user,where:})

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

  }
})