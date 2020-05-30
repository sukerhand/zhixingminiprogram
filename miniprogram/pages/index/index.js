// pages/index/index.js
import { dbGet } from "../../utils/getDB";
import {PRODUCTFIELD} from "../../models/productField";
var app = getApp();
Page({
   
        data: {
            indicatorDots: false, //是否显示面板指示点
            vertical: true,  //是否采用衔接滑动
            autoplay: true, //自动轮播
            interval: 4000, // 自动切换时间间隔
            duration: 1000, // 滑动动画时长
            imgBanner: [ ],
           
            topThemes: [
                {id: 1, title: "小学", img: "../../images/book1.png"},
                {id: 2, title: "中学", img: "../../images/book1.png"},
                {id: 3, title: "高中", img: "../../images/book1.png"},
                {id: 4, title: "其它", img: "../../images/book1.png"}
            ],
           
            bookList: [], 
           

        },
  onLoad(options) {
  this._init()

},
onReady: function () {

},
onShow: function () {

},
onHide: function () {

},
onUnload: function () {

},
onPullDownRefresh: function () {
},
onReachBottom: function () {
  
},
onShareAppMessage: function () {

},
_init:async function () {
   await dbGet({field:PRODUCTFIELD,where:{tag:"精品"}}).then(res =>this.setData({bookList:res}) )
   await dbGet({name:'banner'}).then(res =>{
        this.setData({imgBanner:res[0].bannerimg}) 
         app.globalData.smessage= res[1].smessage;
         
    })
    
}

})
