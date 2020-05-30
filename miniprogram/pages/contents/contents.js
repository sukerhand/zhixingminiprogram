// miniprogram/pages/contents/contents.js
import {
    dbGet
} from "../../utils/getDB";
import {
    PRODUCTFIELD
} from "../../models/productField";
var app = getApp();
var page = app.globalData.chioceGrade;

Page({

    /**
     * 页面的初始数据
     */
    data: {

        placement: 'left',
        placementArr: ['top', 'left', 'right', 'bottom'],
        bookListAll:[],
    
        currentpage:"",
        menuList: [],
        menuListAll: [],
        bookList: [],
       
    },

     changeTops(e) {

        switch (e.detail.activeKey) {
            case "P":
                if (page == "P") {
                    console.log("Primary is OK");
                }else{
                    this._getBookList("小学");
                    this.setData({menuList:this.data.menuListAll[0].tab})
                    page="P"
                }
                break;
            case "M":
                if (page == "M") {
                    console.log("Middle is OK");
                }else{
                    this._getBookList("初中");
                    this.setData({menuList:this.data.menuListAll[1].tab})
                    page="M"
                }
                break;
            case "H":
                if (page == "H") {
                    console.log("High is OK");
                }else{
                    this._getBookList("高中");
                    this.setData({menuList:this.data.menuListAll[2].tab})
                    page="H"
                }
                break;
                case "Other":
                if (page == "Other") {
                    console.log("Other is OK");
                }else{
                    this._getBookList("其它","汉语字典");
                    this.setData({menuList:this.data.menuListAll[3].tab})
                    page="Other"
                }
                break;
        }


    },
    changeTabs(e) {
       
       
        const sel=this.data.menuList;
        const gs={P:"小学",M:"初中",H:"高中",Other:"其它"}
        
        switch (page) {
            case "P":
                this._getBookList("小学",sel[e.detail.activeKey])
                break;
                case "M":
                this._getBookList("初中",sel[e.detail.activeKey])
                break;
                case "H":
                this._getBookList("高中",sel[e.detail.activeKey])
                break;
                case "Other":
                this._getBookList("其它",sel[e.detail.activeKey])
                break;
           
        }
        
        
        
        
    },



    onLoad: async function (options) {
      
    this._init()    
    
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
        
    //    if(this.data.menuListAll) {
    //     this._showContent();
    // }
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
    _init: async function(){
        this.setData({currentpage:page})
        await  dbGet({
               name: "leftmenu",
           }).then(res => {
               this.setData({
                   menuListAll:res,
                   menuList:res[0].tab
               })
           })
           this._showContent()
    },
     _getBookList(_grade="小学",_tab="同步练习") {
         dbGet({
            field: PRODUCTFIELD,
            where: {
                grade: _grade,
                category:_tab,
            }
        }).then(res => {
            this.setData({
               
                bookList: res,
            })
        })
    },
    
    _showContent(){
       
      
       
        switch (page) {
            case "P":{
                this._getBookList("小学");
                this.setData({menuList:this.data.menuListAll[0].tab});
            }
                break;
            case "M":{
                this._getBookList("初中");
                this.setData({menuList:this.data.menuListAll[1].tab});
            }
                break;
            case "H":{
                this._getBookList("高中");
                this.setData({menuList:this.data.menuListAll[2].tab});
            }
                break;
            case "Other":{
                this._getBookList("其它","汉语字典");
                this.setData({menuList:this.data.menuListAll[3].tab});
            }
                break;
        
           
        }
        this.setData({currentpage:page})
    }
})