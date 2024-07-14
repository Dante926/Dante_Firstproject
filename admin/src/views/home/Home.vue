<template>
    <div>
        <el-page-header @back="goBack" icon="" title="企业门户管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 首页 </span>
            </template>
        </el-page-header>

        <el-card style="max-width: 100%">
            <!-- 栅格布局 总共24格子-->
            <el-row>
                <!-- 头像 -->
                <el-col :span="6">
                    <el-avatar :size="100" :src="avatarUrl" />
                </el-col>

                <!--  -->
                <el-col :span="18">
                    <!-- <el-row>
                        <el-col :span="4.5">
                            个人简介：
                        </el-col>
                        <el-col :span="19.5">
                            走自己的路,让别人说去吧！
                        </el-col>
                    </el-row> -->
                    <h2 style="line-height: 100px;"> {{welcomeText}}</h2>
                </el-col>
            </el-row>
        </el-card>

        <el-card style="max-width: 100%;">
            <template #header>
                <div class="card-header">
                    <span>百院产品</span>
                </div>
            </template>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
console.log(store.state);// 获取vuex中信息

// 用户的头像计算属性
/* 
    当我们能从vuex中获取到用户头像则使用该头像，
    如果没有头像则默认使用默认头像

    其实就是简单的三元运算,在标签的:src中直接写也行的其实
*/
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://127.0.0.1:8089'+store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)
// 用户welcomeText计算属性
/* 
    new Date().getHours() 获取当前时间段小时数
*/
const welcomeText = computed(() =>new Date().getHours()<12?'今天也要努力工作,要开心每一天~':'您可能累了，休息之后再继续吧~')
</script>

<style lang="scss" scoped>
.el-card {
    margin-top: 25px;
}

// 添加这部分来修改产品卡片头部的样式
.card-header {
    // 修改字体颜色
    color: #333;
    // 添加字体大小
    font-size: 16px;
}

::v-deep(.el-card__header) {
    // 修改<template #header>样式
    padding: 16px; // 调整内边距
    line-height: 0.6; // 行高
}

// 轮播图样式
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>