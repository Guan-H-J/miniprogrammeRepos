// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    product: {
        price: 10,
        num: 5
    },
    products: [
        {
            name:'苹果',
            price: 3.2
        },
        {
            name:'面包',
            price: 5
        },
        {
            name:'可乐',
            price: 3.5
        }
    ]
},
onAddNum () {
    this.setData({
        'product.num' : this.data.product.num + 1
    })
},
onAddNumN (e) {
    const step = parseInt(e.target.dataset.step);
    this.setData({
        'product.num' : this.data.product.num + step,
    })
},
onInput (e) {
    const val = parseInt(e.detail.value);
    this.setData({
      "product.num" : val
    }) 
}
})
