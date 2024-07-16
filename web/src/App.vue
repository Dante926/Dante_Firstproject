<template>
  <Navbar/>
  <router-view/>
</template>

<script setup>
import Navbar from '@/components/Navbar'
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

// 滚动条优化(所有页面)
::-webkit-scrollbar{
  width: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb{//滚动条的滑块（thumb）的样式
  background:#1890ff
}

::-webkit-scrollbar-track{//滚动条的轨道（track）的样式。
  background:#ddd
}
</style>
