<template>
    <div>
        <el-aside :width="$store.state.isCollapsed? '64px' : '200px'">
            <el-menu :collapse='$store.state.isCollapsed' :collapse-transition="false" :router="true" :default-active="route.fullPath">
                <!-- 
                    collapse:用于开关折叠拦
                    collapse-transition：折叠动画效果
                    router:用于开启路由导航，开启时属性上的index将变成path路径
                    default-activ: 设置图标高亮 我们设置成在那个路径时那个路径的图标就高亮
                -->
                <el-menu-item index="/index"><!-- 直接用路径名作index标记(路由路径唯一不重复) -->
                    <el-icon><HomeFilled /></el-icon><!-- icon图标 -->
                    <span>首页</span>
                </el-menu-item>

                <el-menu-item index="/center">
                    <el-icon><Avatar /></el-icon>
                    <span>个人中心</span>
                </el-menu-item>

                <el-sub-menu index="/user_manage" v-admin>
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                        <el-menu-item index="/user_manage/adduser">添加用户</el-menu-item>
                        <el-menu-item index="/user_manage/userlist">用户列表</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="/news_manage">
                    <template #title>
                        <el-icon>
                            <MessageBox />
                        </el-icon>
                        <span>新闻管理</span>
                    </template>
                        <el-menu-item index="/news_manage/addnews">添加新闻</el-menu-item>
                        <el-menu-item index="/news_manage/newslist" v-admin>新闻列表</el-menu-item>
                        <el-menu-item index="/news_manage/newspub">已发新闻</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="/product_manage">
                    <template #title>
                        <el-icon>
                            <Reading />
                        </el-icon>
                        <span>产品管理</span>
                    </template>
                        <el-menu-item index="/product_manage/addproduct">添加产品</el-menu-item>
                        <el-menu-item index="/product_manage/productlist">产品列表</el-menu-item>
                </el-sub-menu>

            </el-menu>
        </el-aside>
    </div>
</template>

<style lang="scss" scoped>
    .el-aside {
        height: 100vh;
    }
    .el-menu {
        height: 100vh;
    }
</style>

<script setup>
    // 导入icon组件库
    import {HomeFilled,Avatar,UserFilled,MessageBox,Reading,Pointer} from '@element-plus/icons-vue'
    // 引入当前模块路径的route方法
    import {useRoute} from 'vue-router'
    import { useStore } from 'vuex';

    const route = useRoute();
    //console.log(route.fullPath); // 页面在那个路径route.fullPath就是那个
    const store = useStore();

    const VAdmin={
        mounted(el){
            //console.log(el); // 获取当前组件的dom元素
            if (store.state.userInfo.role!==1) {
                // 移除侧边栏
                el.remove()
            }

        }
    }
</script>