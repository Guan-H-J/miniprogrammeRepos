// components/tabs/tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        listData: [],
        active: -1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadTabsData () {
            wx.request({
              url: 'https://api.imooc-blog.lgdsunday.club/api/hot/tabs',
              success: (res) => {
                  console.log(res);
                  this.setData({
                      listData : res.data.data.list,
                      active : 0
                  })
              }
            })
        },
        onItemClick (e) {
            const {index} = e.target.dataset;
            this.setData({
                active : index
            })
        }
    },
    
    lifetimes: {
        attached () {
            this.loadTabsData();
        }
    },
    observers: {
        active : function (val) {
            const { id } = this.data.listData[val];
            console.log(`当前选中的 ID：${ id }`)
            this.triggerEvent('change',{
                id
            }
            )
        }

    }
})
