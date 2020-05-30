// components/category-grid/index.js
var app = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        grid: Array,
        
    },

    /**
     * 组件的初始数据
     */
    data: {
       
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap: function (event) {
          

            switch (event.detail.index) {
                case 0:
                    app.globalData.chioceGrade="p";
                    
                    break;
                case 1:
                    app.globalData.chioceGrade="M";
                    
                    break;
                case 2:
                    app.globalData.chioceGrade="H";
                    
                    break
                case 3:
                    app.globalData.chioceGrade="Other";
                   
                    break;
                    
            }
            
            wx.switchTab({
                url:`/pages/contents/contents`})

        }
    }
})
