import { dbGet } from "../../utils/getDB";
var app=getApp();

var thisclass = 0
Page({

  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
  detailList:[],
  book:null,
  class:["one","two","three","four","five","six","seven","eight","nine","ten"],
  imgBookurl:"cloud://zhixing-book.7a68-zhixing-book-1302219995/images/",
  seleClass:[],
  thisPrice:0,
  content:"",
  show:false,
  },
  async onSelect(e){
    let selectClass=this.data.seleClass;
    if(thisclass){selectClass[0].sel=false}
    if(!e.detail.select){
    selectClass[thisclass].sel=false;
    selectClass[e.target.id].sel=true;
    
    await this.setData({
      seleClass: selectClass,
      thisPrice: this.data.book.subprice[e.target.id],
    })
    thisclass=e.target.id;
        const chioce=this.data.class[e.target.id]
        await this.setData({detailList:this.data.book.details[chioce]});
  }
    
     
  },
  chooseImg(event){
    
    const thisImg=event.target.id;
    const url=this.data.imgBookurl;
    let list=[];
  
     this.data.detailList.forEach(function(value,index)  {
      list[index]=url+value;
    });
    
    
    wx.previewImage({
      current:url+this.data.detailList[thisImg],
      urls:list,
    })
  },
  showMessage:function(e){
    wx.showModal({
      title: '温馨提示',
      content: app.globalData.smessage,
      showCancel:false,
      success (res) {
        if (res.confirm) {
       
        }
      }
    })
    
    
    
  },
   async  onLoad(options) {
   this.setData({message:app.globalData.smessage})
   await dbGet({doc:options.bid}).then(res =>{
    this.setData({book:res,
    detailList:res.details.one,
    seleClass:res.class,
    thisPrice:res.subprice[0],
  })
    })
    
  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  
  onShareAppMessage: function () {

  }
})