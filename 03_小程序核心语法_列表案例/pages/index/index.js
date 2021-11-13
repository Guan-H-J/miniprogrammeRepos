// index.js
// 获取应用实例
const app = getApp()

Page({
  onGetClick () {
    wx.request({
      url: 'https://api.imooc-blog.lgdsunday.club/api/test/getList',
      method: "GET",
      success: (res) => {
        console.log(res)
      }
    })
  },
  onPostClick () {
    wx.request({
      url: 'https://api.imooc-blog.lgdsunday.club/api/test/postData',
      method: "POST",
      data: {
        msg: '祝愿大家心想事成，万事如意！'
      },
      success: (res) => {
        console.log(res)
      }
    })
  },
    async onAsyncClick () {
    const resA = await this.pA();
    console.log(resA.data.data.msg);
    const resB = await this.pB();
    console.log(resB.data.data.msg);
    const resC = await this.pC();
    console.log(resC.data.data.msg);
    const resD = await this.pD();
    console.log(resD.data.data.msg);
  },
  pA() {
    return new Promise((resolve,reject) => {
      console.log('执行A接口的逻辑')
      wx.request({
        url: 'https://api.imooc-blog.lgdsunday.club/api/test/A',
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
        })
      })
    },
  pB() {
    return new Promise((resolve,reject) => {
      console.log('执行B接口的逻辑');
      wx.request({
        url: 'https://api.imooc-blog.lgdsunday.club/api/test/B',
        success:(res) => {
          resolve(res);
        },
        fail:(err) => {
          reject(err);
        }
        })
      })
    },
  pC() {
    return new Promise((resolve,reject) => {
      console.log('执行C接口的逻辑');
      wx.request({
        url: 'https://api.imooc-blog.lgdsunday.club/api/test/C',
        success:(res) => {
          resolve(res);
        },
        fail:(err) => {
          reject(err);
        }
        })
      })
    },
  pD() {
    return new Promise((resolve,reject) => {
      console.log('执行D接口的逻辑');
      wx.request({
        url: 'https://api.imooc-blog.lgdsunday.club/api/test/D',
        success:(res) => {
          resolve(res);
        },
        fail:(err) => {
          reject(err);
        }
        })
      })
    },
  })
