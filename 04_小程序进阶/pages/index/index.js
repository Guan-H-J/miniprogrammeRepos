// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    tabSelectID : ''
  },
 onTabChange (e) {
   const {id} = e.detail;
   console.log(`父组件中接收到的 ID：${id}`);
   this.setData({
     tabSelectID : id
   })
 }
})
