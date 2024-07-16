<template>
  <Navbar/>
  <router-view/>
</template>

<script setup>
import Navbar from '@/components/Navbar'
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

/* 滚动条优化(所有页面) */
::-webkit-scrollbar {
  width: 5px; /* 调整滚动条的宽度 */
  height:5px; /* 可选：垂直滚动条的高度 */
}

::-webkit-scrollbar-thumb {
  background-color: #1890ff; /* 滑块的背景色 */
  border-radius: 4px; /* 可选：滑块的圆角 */
}

::-webkit-scrollbar-track {
  background-color: #ddd; /* 轨道的背景色 */
  border-radius: 4px; /* 可选：轨道的圆角 */
}

</style>
