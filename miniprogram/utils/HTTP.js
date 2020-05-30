

 const tip = (text) => {
    wx.showToast({
        title: text,
        'icon': 'none',
        duration: 2000
    })
};
export const cloud_getDB = ({name='books',where={},data="all"})=> {
    const promise = new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'queryDB',
            data: {
                name: name,
                where: where
            }
        }).then(res => {
            tip('数据库调用成功！')
            console.log(res.result.data)
            wx.setStorageSync(data, res.result.data)
            resolve(res.result.data)
        }).catch(err => {
            reject(err)
            tip('请联系开发者，连接错误！')
        })
        return  promise
    })
}


