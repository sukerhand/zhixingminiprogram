// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:Object,
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgBookurl:"cloud://zhixing-book.7a68-zhixing-book-1302219995/images/",
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      const bid = this.properties.data._id
      wx.navigateTo({
        url:`/pages/detail/detail?bid=${bid}`
      })
  }
}
})
