// miniprogram/pages/my/my.js
var app=getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
     
        userInfo: [],
        defaultImg: '../../images/header.png',
        orders: [],
    },
    tapone(e){
      wx.getSetting({
        success(res) {
         
          if (res.authSetting['scope.userInfo']) {
            wx.navigateTo({
              url: '../teacherlogin/teacherlongin'
            })
            return;
          } else {
            wx.showModal({
              title: '温馨提示',
              content: "请先【点击登录】，并【允许】授权！",
              showCancel: false,
              success(res) {
                if (res.confirm) {return}
              }
            })
          }
        }
      })
      },
getuserinfo:function(event){
        this.setData({
          userInfo:event.detail.userInfo
        })
      },
  
    onLoad: function (options) {
    
      this._getInfo();
      
      
    },

    onReady: function () {

    },

    onShow: function () {
        wx.getUserInfo({
            success: (res) =>{
              
             this.setData({
              userInfo:res.userInfo
             })
            }
          })   
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
    _getInfo: function () {
     
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) //此处判断是否登录
          {
            wx.getUserInfo({
              success: (data) => {
                app.globalData.haveauth = true
                app.globalData.userInfo = data.userInfo //全局变量赋值
              }
            })

          }
        }
      })
    }
})