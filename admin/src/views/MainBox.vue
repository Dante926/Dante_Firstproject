<!-- 
    # 作责：百院鹅珀
    # QQ  ：2802471732
 -->

<!-- 
    此路由用作 主页等等其他切换页面
  -->
<template>
    <div>
        <el-container>
            <SideMenu></SideMenu>
            <el-container direction="vertical"><!-- 手动设置成垂直布局,element-ui的el-main组件默认是水平布局的 -->
                <TopHeader></TopHeader>
                <el-main><router-view></router-view></el-main>
                <!-- 
                    在Vue.js应用程序中，<router-view>是一个特殊的组件，用于显示当前路由匹配到的组件内容。当你在地址栏输入一个路由路径时，Vue Router会根据这个路径来匹配相应的组件，并将其渲染到<router-view>中。

                    所以，当你在地址栏输入一个路由路径时，如果这个路径在你的Vue Router配置中存在，并且与某个组件相关联，那么这个组件就会被渲染到<router-view>中。
                -->
                
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import TopHeader from '../components/mainbox/TopHeader'
import SideMenu from '../components/mainbox/SideMenu'
</script>

<style lang="scss" scoped>
    .el-main{
        overflow: auto;
        height: calc(100vh - 60px);
    }
</style>