<template>
  <div
    class="float-panel__container"
    ref="container"
    :style="{
      transform: translation
        ? `translateY(${translation}px)`
        : `translateY(calc(${floatPanelHeaderHeight}) * -1))`
    }"
  >
    <transition name="fade">
      <div
        class="float-panel__mask"
        @click="resetPanel"
        v-if="isReachTop"
        :class="overlay ? 'float-panel__overlay' : ''"
      ></div>
    </transition>
    <div class="float-panel" ref="float-panel">
      <div
        class="float-panel__header"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        ref="float-panel__header"
      />
      <slot></slot>
    </div>
    <div class="float-panel__holder" />
  </div>
</template>

<script>
export default {
  name: 'Vue2FloatPanel',
  data() {
    return {
      startY: 0,
      translation: 0,
      floatPanelHeaderHeight: 0,
      floatPanelHeight: 0
    }
  },
  props: {
    /**
     * 是否展示遮罩层
     */
    overlay: {
      type: Boolean,
      default: false
    },
    /**
     * 是否在点击遮罩层后关闭面板
     */
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isReachTop() {
      return (
        !!this.translation && this.translation <= this.floatPanelHeight * -1
      )
    },
    isReachBottom() {
      return (
        !!this.translation &&
        this.translation >= this.floatPanelHeaderHeight * -1
      )
    }
  },
  mounted() {
    const floatPanelHeader = this.$refs['float-panel__header']
    const floatPanel = this.$refs['float-panel']
    this.floatPanelHeaderHeight = floatPanelHeader.clientHeight
    this.floatPanelHeight = floatPanel.clientHeight
  },
  methods: {
    resetPanel() {
      if (!this.closeOnClickOverlay) {
        return
      }
      this.translation = this.floatPanelHeaderHeight * -1
    },
    openPanel() {
      this.translation = this.floatPanelHeight * -1
    },
    onTouchStart(event) {
      this.startY = event.touches[0].clientY
      const container = this.$refs.container
      const touchDuration = getComputedStyle(container).getPropertyValue(
        '--float-panel-touch-duration'
      )
      container.style['transition-duration'] = `${touchDuration}`
    },
    onTouchMove(event) {
      const moveY = event.touches[0].clientY
      const deltaY = moveY - this.startY
      const isTopAndUp = this.isReachTop && deltaY < 0
      const isBottomAndDown = this.isReachBottom && deltaY > 0
      if (!moveY || isTopAndUp || isBottomAndDown) {
        return
      }
      this.translation += deltaY
      this.startY = moveY
    },
    onTouchEnd() {
      const halfFloatPanelHeight = this.floatPanelHeight / 2
      let autoTranslation = 0
      const finalTranslation = Math.abs(this.translation)

      // 移动高度小于浮动弹窗一半
      if (
        finalTranslation < this.floatPanelHeaderHeight ||
        finalTranslation < halfFloatPanelHeight
      ) {
        autoTranslation = this.floatPanelHeaderHeight * -1
        this.$nextTick(() => {
          this.$emit('moveToBottom')
        })
      }
      // 移动高度大于浮动弹窗一半
      else if (finalTranslation >= halfFloatPanelHeight) {
        autoTranslation = this.floatPanelHeight * -1
        this.$nextTick(() => {
          this.$emit('moveToTop')
        })
      }
      const container = this.$refs.container
      const initDuration = getComputedStyle(container).getPropertyValue(
        '--float-panel-init-duration'
      )
      container.style['transition-duration'] = `${initDuration}`
      this.translation = autoTranslation
    }
  }
}
</script>

<style lang="scss" scoped>
.float-panel__container {
  --float-panel-start-height: 200px;
  --float-panel-end-height: 600px;
  --float-panel-init-duration: 0.5s;
  --float-panel-touch-duration: 0.1s;

  user-select: none;
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  top: 100%;
  transition: transform ease;
  transition-duration: var(--float-panel-init-duration);
  transform: translateY(calc(var(--float-panel-start-height) * -1));
}

.float-panel__header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--float-panel-start-height);
  z-index: 10;
  &:hover {
    cursor: grab;
  }
}

.float-panel {
  height: var(--float-panel-end-height);
  border-radius: 32px 32px 0 0;
  background-color: white;
  position: relative;

  &::before {
    content: '';
    background: #c8c9cc;
    width: 72px;
    height: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    border-radius: 32px;
    top: 20px;
  }
}

.float-panel__holder {
  height: 100px;
  background-color: white;
}

.float-panel__mask {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  transform: translateY(calc(-100% + 32px));
}

.float-panel__overlay {
  background-color: rgba(0, 0, 0, 0.7);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity;
  transition-duration: var(--float-panel-init-duration);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
