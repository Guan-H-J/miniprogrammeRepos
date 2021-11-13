#                                                    Uni-app开发

## 	

## 	小程序初体验



### 				小程序项目基本结构		

一个小程序页面由四个文件组成（.wxml/.wxss/.js/.json）

project.config.json文件是项目配置文件

sitemap.json文件配置小程序及其页面是否允许被页面索引

### 		wxml VS html

**wxml是框架设计的一套标签语言（组件），用来构建小程序页面结构，其作用类似于html**

但是有一下几点不同：

标签名称不同

属性节点不同

提供了动态渲染数据的模板语法

注意：在wxml中不要使用html中的标签

### 		wxss VS css

**wxss是一套样式语言，用于描述wxml的组件样式，类似于网页中的css，具有css的大部分特性**

wxss中新增了尺寸单位：rpx，一个rpx为页面宽度的1 / 750

提供了全局样式的局部样式

推荐使用类选择器

### 		.json配置文件

小程序中额外多出了一个.json配置文件，一个是项目根目录下的，负责修改项目的基本配置；			一个是页面中的，修改页面的基本配置

### 		宿主环境和小程序的运行环境

宿主环境：程序运行所必须依赖的环境（微信小程序依赖的就是微信）

运行环境：wxml，wxss（渲染层）

​					jscore（逻辑层）

### 		小程序的内置组件

1.view 类似于html中的div，视图容器

​	属性：hover-class 指定按下去的样式类

​		 	  hover-stop-propagation 指定是否阻止本节点的祖先节点出现点击态，默认false

​		 	  hover-start-time 按住后多久出现点击态

​		 	  hover-stay-time 手指松开后点击态保留时间


2.scroll-view 可以理解为添加了 overflow: scroll; 属性的div

​	属性：scroll-y 允许竖向滚动

​		 	   scroll-x 允许横向滚动
​			
3.swiper 滑块视图容器，其中只可放swiper-item组件

​	属性：indicater-dots 是否显示面板指示点

​		  	  indicator-active-color 当前显示的指示点颜色

​		  	  autoplay 自动滚动

4.text 文本。参考span标签

​	属性：nodes 节点列表、HTML strings

5.button 按钮

​	属性：type 设定按钮的样式类型

​		 	  open-type 微信的开放能力

### 		小程序发布流程

分为两个大版本 

​	本地—开发版本

​	上传—开发版本/体验版本

​	上传—审核版本

​	上传—正式版本



## 	小程序核心语法

**大纲：数据驱动原则，商品案例，列表案例**



### 			小程序的数据驱动原则

当数据发生变化时，视图理应发生变化

在wxml中如果要访问数据（data定义），必须要使用{{}}，该语法可以放置任一的，单一的javascript表达式

**在小程序中绑定数据**

1.在data中定义数据

2.在wxml中通过{{}}使用数据

### 		小程序的常用事件与属性列表

小程序中点击事件是tap，监听tap事件需要用到bind

1.bindtap（推荐）

2.bind:tap

要修改data中的数据，需要调用 setData函数

要访问data中的数据，使用 this.data

### 		事件传参

**为点击事件传递参数**

1.event 对象：形参，通过 e.target.dataset.xx 访问传递的实参

2.data-xx 属性：实参

​	2.1 小程序中不能直接为回调函数传递实参

​	2.2 属性绑定的形式，把需要传递的参数绑定到当前DOM元素的 data-xx 属性下

### 		实现双向数据绑定

**当视图发生变化时，数据跟随发生变化**

两个属性

bindtap：监听用户输入行为

value：绑定逻辑层的数据

### 		条件渲染

1.wx:if... ，wx:elif... , wx:else 

2.hidden

**两者区别**

1.当 wx:if 条件满足则进行渲染，否则不渲染

2.当hidden条件满足则隐藏，否则不隐藏

一般来说，wx:if 有更高的切换消耗，而hidden有更高的初始渲染消耗

因此，如果需要频繁切换的情况下，用hidden更好

​			如果运行条件不大可能改变，用 wx:if 更好

### 列表渲染

wx:for="{{要循环的列表}}" ，要配合 wx:key 使用

默认的当前项和下标名称：item；index

block组件，包裹性质的容器，不会进行渲染

注意：使用 index 作为 wx:key 的表达式时不需要使用{{}}

### 配置文件解读

**app.json 文件**

​	pages 用于指定小程序由哪些页面组成，每一项都对应一个页面的路径（含文件名）信息

​	window 用于设置小程序的状态栏，导航条，标题，窗口背景色

​	tabbar 如果小程序时一个多tab应用，可以通过tabbar配置项指定tab栏的表现，以及tab切换时显示的对应页面

### 数据请求

1.wx.request 发起https网络请求

2.服务端返回请求的数据

3.使用success 回调函数进行接收

小程序发起网络请求的限制

1.只能请求https类型接口

2.必须把域名添加到信任列表中（解决方案：1.生产环境下，配置合法域名；2.开发环境下，勾选【不校验合法域名】）

### 异步编程新方案-promise

回调地狱：回调函数中出现大量嵌套导致出现复杂且难以阅读的逻辑

**promise是一个构造函数，所以通过 new 关键字来构建实例**

步骤：

1.创建promise实例

2.构造函数promise中接收一个回调函数

3.resolve：是一个回调函数，表示promise执行成功

4.reject：是一个回调函数，表示promise执行失败

**promise的状态**

1.待定（pending）：初始状态，既没有被兑现，也没有被拒绝

2.已兑现（fulfilled）：操作成功兑现

3.已拒绝（rejected）：操作失败

**使用promise实例**

.then ：接收已兑现的结果

.catch：接收已拒绝的结果

在 .then 中，可以继续return一个promise的实例，可以在下一次的 .then 中使用

### 异步编程再升级 async和await

async + await 必须配合promise使用，同时async + await 必须一起使用

async 和 await 可以简化promise的异步操作，把异步操作变为同步的写法

async ：标记一个函数为异步函数

await ：需要在异步函数中使用，标记当前的操作为异步操作

### 小程序中使用promise解决异步编程

1.因为小程序中的 wx.request 方法不支持promise化，使用promise封装 wx.request 的请求

~~~javascript
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
~~~

### 小程序页面的生命周期

页面出现后直接获取接口数据，并进行渲染

生命周期：一件事物由创建到销毁的全过程

生命周期函数：生命周期中的关键时刻

页面的生命周期函数

~~~javascript
onLoad: function (options) {}

onReady: function () {}

onShow: function () {}

onHide: function () {}

onUnload: function () {}
~~~

 ### PullToRefresh 下拉刷新与上拉加载

当列表中数据过多，分页加载数据

~~~javascript
onReachBottom: function () {} // 页面上拉触底事件处理函数
~~~

开启下拉刷新：.json 文件中开启

~~~javascript
onPullDownRefresh: function () {} // 监听用户下拉动作
~~~

### 小程序的页面跳转

两种方式：

**1.声明式导航**

​	使用 navigator 标签

​	要想跳转到非 tabbar 页面，需要使用 url 属性，url 表达式必须以 / 开头

​	要想跳转到 tabbar 页面，除使用 url 属性外，还需使用 open-type 属性并指定为 open-type=”switchTab“

​	要想实现后退页面，需指定 open-type=”navigateback“

**2.编程式导航**

​	使用三个方法

~~~javascript
wx.switchTab ({}) // 跳转到 tabbar 页面

wx.navigateTo ({}) // 跳转到非 tabbar 页面

wx.navigateBack ({
    delta: ,
}) // delta 指定页面后退层级
~~~

### 导航传参

小程序的导航传参遵循”get“请求标准

使用 ? 分隔 url 和参数

以 = 连接参数的 key 和 value

以 & 来拼接参数

~~~javascript
onLoad: function (options) {} // 接收其他页面跳转过来时传递的参数，赋为options
~~~



## 小程序进阶概念

### 组件化思想



### 创建第一个组件

**1.创建组件**

（1）创建 components 文件夹

（2）创建 tabs 和 list 文件夹

（3）右键新建component

**2.使用组件**

（1）找到页面的 .json 文件

（2）在 usingComponents 选项下注册组件

​		  1.key 为当前组件在该页面中的标签名

​		  2.value 为组件的代码路径

（3）在页面的wxml文件中，以注册的 key 为标签名，使用组件

### 组件的生命周期

**组件的生命周期，应该被定义在 lifetime 中，而方法必须要放到methods中**

**组件的生命周期一共有三个**

~~~javascript
created () {} // 组件刚刚被创建好，此时还不能使用 setData

attached () {} // 组件完全初始化完毕，进入页面节点树后，绝大多数初始化工作可以在这个时机进行

detached () {} // 在组件离开页面节点树后
~~~

### 数据监听器

通过 observers 选项来声明数据监听器从而监听数据的变化

~~~javascript
// 这个方法是一个 key : value 结构
// key：要监听的数据
// value：数据变化时，调用的函数
observers: {
    xxx : function (val) {
    // val:变化之后的值    
    }
} 
~~~

### 组件之间的关系与通讯

**不同关系之间的传递数据方式**

1.父子关系

​	（1）父向子传参

~~~javascript
// 子组件中，通过 properties 声明要从父组件中接收的数据
properties: {} 

// 父组件中，通过自定义属性的形式传递数据，以子组件中定义的 key 为属性名，以要传递的数据为属性值
<list tabId="{{tabSelectId}}">
~~~

​	（2）子向父传参

~~~javascript
// 子组件中，通过 triggerEvent 方法发送一个通知，通知父组件接收数据
// 方法的第一个参数为：通知名
// 方法的第二个参数为：要传递的数据
this.triggerEvent('xxx',)

// 父组件中，通过 bind 监听子组件中发送的通知
// bind 后的内容为子组件发送的通知名，表达式为接收到该通知时所触发的方法
<tabs bind:change="onTabChange"></tabs>
// 方法被触发后可以通过 e.detail 的形式获取子组件传递过来的数据对象
onTabChange (e) {
    const (id) = e.detail;
    this.setData({
        tableSelectId : id
    })
}
~~~

2.兄弟关系

​	（1）兄弟关系 === 没有关系

​			  要找到这两个组件都认识的“中间人”来建立关系

​			  一般为统一的父组件

​	（2）兄弟组件之间想要传递数据，需要利用“中间人”进行传递

​			【兄弟 A 组件】传递数据给父组件（中间人）

​			  父组件（中间人）再把数据传递给【兄弟 B 组件】

### 组件的插槽

**定义插槽**

1.定义单一插槽：

​	在**组件**中以 slot 定义插槽

​	表示：占据了这一块空间，等待父组件填充

2.定义多个插槽：

​	**在组件中指定”options“选项的”multipleSlots“选项为”true“**

​	然后通过 slot 的 name 属性为插槽命名

**使用插槽**

1.使用单一插槽：

​	在组件使用时，以 innerHTML 的形式插入内容

2.使用多个插槽：

​	以 slot 属性标记当前 DOM 插入到哪个插槽中



## uniapp 开发 ImoccBlog



### 认识 .vue 文件与 logo 图片展示

**template** => wxml

定义当前页面的结构

<image>组件的 src 属性中 @ 符号相当于当前项目的根目录

**script** => js

定义当前页面的逻辑

**style** => wxss

定义当前页面的样式

<style>标签中一般添加 scoped 属性，表示当前文件的样式只在当前组件中生效

### 创建搜索框组件

1.具备输入框的样式

2.不可输入

3.placeholder 可以在父组件中定义













 















​			









