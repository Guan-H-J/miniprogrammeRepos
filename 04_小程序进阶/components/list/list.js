// components/list/list.js
Component({
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        tabID : String
    },

    /**
     * 组件的初始数据
     */
    data: {
        listData: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadListData () {
            wx.request({
              url: 'https://api.imooc-blog.lgdsunday.club/api/hot/list',
              data: {
                  type: this.data.tabID
              },
              success: (res) => {
                console.log(res.data.data);
                this.setData({
                    listData : res.data.data.list
                })
              }            
            })
        }
    },
    observers: {
        tabID : function (val) {
            if(!val) return;
            console.log(`list组件中接收到的 ID：${val}`);
            this.loadListData()
        }
    }
})
