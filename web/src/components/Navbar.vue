<template>
    <div class="navbar">
        <el-menu :default-active="route.fullPath" class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/news">新闻中心</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="" @click="handleClick">登录</el-menu-item>
        </el-menu>
        <div class="right">偏爱王冰冰</div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const handleClick=()=>{
    window.location='http://localhost:8081/'
}
</script>

<style scoped   lang="scss">
.navbar{
    position:sticky;
    top:0;
    z-index: 990;   
}
.right{
    position: fixed;
    right: 11px;
    top: 0;
    // widows: 100px;
    // height: 159px;
    line-height: 139px;
    text-align: center;
    // 透明
    opacity: 0.1;
}
</style>