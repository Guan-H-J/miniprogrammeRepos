// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        size: 10,
        total: -1,
        listData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: async function () {
        const data = await this.getList();
        console.log(data);
        this.setData({
            listData: data.list,
            total: data.total
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
    onPullDownRefresh: async function () {
        this.setData({
            page: 1
        })
        const data =await this.getList();
        this.setData({
            listData: data.list
        })
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        if(this.data.total === this.data.listData.length){
            return;
        }
        console.log('onReachBottom');
        this.setData({
            page: this.data.page + 1
        });
        const data = await this.getList();
        this.setData({
            listData:[...this.data.listData,...data.list]
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getList () {
        return new Promise((resolve,reject) => {
            wx.request({
              url: 'https://api.imooc-blog.lgdsunday.club/api/test/getList',
              data: {
                  page: this.data.page,
                  size: this.data.size
              },
              success: (res) => {
                  resolve(res.data.data);
              }
            })
        })
    },

    onSwitchToHome () {
        wx.switchTab({
          url: '/pages/index/index',
        })
    },

    onNavigateToDetail (e) {
        const index = e.target.dataset.indexoflistdata;
        const title = e.target.dataset.titleoflistdata;
        wx.navigateTo({  
          url: `/pages/detail/detail?index=${index}&title=${title}`
        })
    }
})