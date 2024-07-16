<template>
    <div>
        <el-row>
            <el-col :span="17" :offset="1"><!-- offset：左偏移量  pull：右偏移-->
                <!-- 新闻题目 -->
                <h2>
                    {{ currentNews.title }}
                </h2>

                <!-- 编辑信息 -->
                <div class="edit">
                    作者: {{ currentNews.username }} &nbsp;&nbsp;&nbsp; 时间: {{ editTimeFormat(currentNews.editTime) }}
                </div>

                <!-- 新闻内容分割线 -->
                <el-divider border-style="dashed" />

                <!-- 新闻内容 -->
                <div v-html="currentNews.content"></div>
            </el-col>

            <el-col :span="4" :offset="1" :pull="1">

                <el-card style="max-width: 480px">
                    <template #header>
                        <div class="card-header">
                            <span style="font-size: 16px; font-weight: bold;">最近新闻</span>
                        </div>
                    </template>
                    <div v-for="item in topNews" :key="item.id" class="text item" style="padding: 14px;" @click="handleClick(item.id)">
                    <span>{{ item.title }}</span>
                    <div class="tab-time">{{ editTimeFormat(item.editTime) }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { StarFilled } from '@element-plus/icons-vue'

// 获取数据
const route = useRoute()
onMounted(async () => {
    const res1 = await axios.get(`http://127.0.0.1:8089/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`http://127.0.0.1:8089/webapi/news/toplist?limit=4`)
    currentNews.value = res1.data.data
    topNews.value = res2.data.data
    console.log(res2);
})
const currentNews = ref({})
const topNews = ref([])

// 初始化时间函数
const editTimeFormat = (editTime) => {
    const date = new Date(editTime)
    return date.toLocaleString()
}

const handleClick = (id) => {
    console.log(id);
}
</script>

<style scoped lang="scss">
.el-row {
    margin-top: 30px;

}

.edit {
    font-size: 13px;
    color: gray;
}
</style>