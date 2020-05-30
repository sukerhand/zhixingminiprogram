

    const
    db = wx.cloud.database();
    const
    tip = (text) =>
        wx.showToast({
            title: text,
            'icon': 'none',
            duration: 2000
        })
    

//查找
    export
    const
    dbGet=({name = 'product', where = {},field={},doc="",page = 0}) => {

        const promise = new Promise((resolve, reject) => {
            if (!doc) {
                db.collection(name)
                    .where(where)
                    .field(field)
                    .skip(page)
                    .get()
                    .then(res => {
                        resolve(res.data)
                    }).catch(err => {
                    tip('请检查网络，连接错误！')
                })
            } else {
                db.collection(name)
                    .doc(doc)
                    .get()
                    .then(res => {
                        resolve(res.data)
                    }).catch(err => {
                    tip('请检查网络，连接错误！')
                })
            }
        });
        return promise
    };

   
//获取书目列表
    export
    const
    getBookList= (param) => {

        const promise = new Promise((resolve, reject) => {

            db.collection(param.name)
                .where(param.where)
                .get()
                .then(res => {
                    resolve(res.data)

                }).catch(err => {
                tip('请联系开发者，连接错误！')
            })

        });
         return promise
    };
//添加或者更新数据
    export
    const
    dbAdd = ({name="",doc="",data={}}) => {
       
        
        const promise = new Promise((resolve, reject) => {
            let control={};
            if (doc) {
                //数据替换
                console.log("1");
                control = db.collection(name).doc(doc).update({
                    data: data
                })
            } else {
                //直接添加
                console.log("2");
                control = db.collection(name).add({
                    data: data
                })
            }
            control.then(res => {
                resolve(res)
                tip('操作成功！')
            })
                .catch(err => {
                    tip('操作失败，请检查网络！')
                })
        });
        return promise
    };

//删除数据或文件
export const dbDel = (param) => {
    const promise = new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: '删除后不可恢复，确认删除吗？',
            success(res) {
                if (res.confirm) {
                    db.collection(param.name).doc(param.where).remove().then(res => {
                        resolve(res)
                    })
                    if (param.fileId){
                        //删除文件的情况   删除源文件
                        wx.cloud.deleteFile({
                            fileList: [param.fileId]
                        })
                    }
                }
            }
        })
    });
    return promise
};

//上传图片
export const dbUpload = (param) => {
    const promise = new Promise((resolve, reject) => {
        // 待插入的集合名字
        let nameStr = param.name
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                wx.showLoading({
                    title: '正在上传...'
                });
                //文件名称
                let filePath = res.tempFilePaths[0];
                const name = parseInt(Math.random() * 1000000000);
                const cloudPath = nameStr + name + filePath.match(/\.[^.]+?$/)[0]
                if (param.fileId){
                    //更新文件得情况则先删除文件
                    wx.cloud.deleteFile({
                        fileList: [param.fileId]
                    })
                }
                //上传文件到服务器
                wx.cloud.uploadFile({
                    cloudPath,//云存储图片名字
                    filePath//临时路径
                }).then(res=>{
                    let fileID = res.fileID;
                    //存储或者更新数据
                    return dbAdd({
                        name: nameStr,
                        where: param.where || null,
                        loadStart: true,
                        data: {
                            url: fileID
                        }
                    });
                }).then(res=>{
                    resolve(res)
                });
            }
        })
    });
    return promise
};

