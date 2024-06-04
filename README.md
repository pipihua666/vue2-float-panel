# Vue2FloatPanel

## 介绍

浮动在页面底部的面板，可以上下拖动来浏览内容，常用于提供额外的功能或信息。

## 引入

```js
import Vue from 'vue'
import Vue2FloatPanel from 'vue2-float-panel'
Vue.component(Vue2FloatPanel.name, Vue2FloatPanel)
```

## 使用示例

### 基本使用

通过组件级的 `css variable` 自定义面板的初始高度、最终高度、拖动过渡时间、初始过渡时间

```html
<template>
  <vue2-float-panel @moveToBottom="moveToBottom" @moveToTop="moveToTop">
    <div class="overflow">
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
      <div>我是例子1</div>
    </div>
  </vue2-float-panel>
</template>

<script lang="js">
  import Vue2FloatPanel from 'vue2-float-panel'

    export default {
      name: 'Demo1',
      components: {
        Vue2FloatPanel,
      },
      methods:{
        moveToBottom(){
          console.log('我到达了底部~')
        },
        moveToTop(){
          console.log('我到达了顶部~')
        }
      }
    }
</script>

<style lang="scss" scoped>
  .overflow {
    height: 100%;
    overflow: auto;
  }

  ::v-deep {
    .float-panel__container {
      /* 初始高度 */
      --float-panel-start-height: 200px;
      /* 最终高度 */
      --float-panel-end-height: 600px;
      /* 初始过渡时间，用于命令打开面板过渡 */
      --float-panel-init-duration: 0.5s;
      /* 拖动过渡时间，用于手动打开面板过渡 */
      --float-panel-touch-duration: 0.1s;
    }
  }
</style>
```

### 命令式打开面板

调用组件实例的`openPanel`方法手动打开面板，可通过`--float-panel-init-duration` css 变量定义过渡动画的时间

```html
<template>
  <div class="float-panel-example">
    <button @click="openPanel">打开面板</button>
    <vue2-float-panel ref="panel" :overlay="true"> 我是例子2 </vue2-float-panel>
  </div>
</template>

<script lang="js">
  import Vue2FloatPanel from 'vue2-float-panel'

  export default {
    name: 'Demo2',
    components: {
      Vue2FloatPanel,
    },
    methods:{
      openPanel(){
        this.$refs.panel.openPanel()
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .float-panel__container {
      --float-panel-start-height: 300px;
      --float-panel-end-height: 1000px;
    }
  }
</style>
```

## API

### 属性

| 属性                | 是否必选 | 说明                       | 类型    | 默认值 |
| ------------------- | -------- | -------------------------- | ------- | ------ |
| overlay             | 否       | 是否展示遮罩层             | Boolean | false  |
| closeOnClickOverlay | 否       | 是否在点击遮罩层后关闭面板 | Boolean | true   |

### 事件

| 事件名       | 说明     | 参数 |
| ------------ | -------- | ---- |
| moveToBottom | 到达底部 | 无   |
| moveToTop    | 到达顶部 | 无   |

### 主题定制

| 变量                         | 说明                               | 默认值 |
| ---------------------------- | ---------------------------------- | ------ |
| --float-panel-start-height   | 初始高度                           | 200px  |
| --float-panel-end-height     | 最终高度                           | 600px  |
| --float-panel-init-duration  | 初始过渡时间，用于命令打开面板过渡 | 0.5s   |
| --float-panel-touch-duration | 拖动过渡时间，用于手动打开面板过渡 | 0.1s   |
