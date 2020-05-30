//app.js
App({
  globalData: {
    userdb: 'product',
    DBenv: 'zhixing-book',
    userInfo: null,
    haveauth:false,
    chioceGrade: 'P',
    smessage:'',
    
    //   //自定义全局变量
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: this.globalData.DBenv,
        traceUser: true,
      })
    }
  },
 
  watch: function (method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "name", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._name = value;
        console.log('是否会被执行2')
        method(value);
      },
      get: function () {
        console.log("globalData value changed!");
        
        return this._name
      }
    })
  },






})