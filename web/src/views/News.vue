<template>
    <div>
        <div class="container">
            <div class="news-header"
                :style="{ backgroundImage: `url(${require('@/assets/4.jpg')})`, backgroundSize: 'cover' }">
            </div>
            <!-- 搜索栏 -->
            <div class="search">
                <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                    <template #reference>
                        <el-input v-model="searchText" placeholder="请输入关键字" type="search" @input="visible = true"
                            @blur="visible = false" :prefix-icon="Search" size="large" />
                    </template>
                    <div v-if="searchlist.length">
                        <div v-for="data in searchlist" :key="data.id" @click="handleClick(data.id)"
                            class="search-item">
                            {{ data.title }}
                        </div>
                    </div>
                    <div v-else>
                        <el-empty description="暂无搜索结果" :image-size="50" />
                    </div>
                </el-popover>
            </div>

            <!-- 顶置新闻 -->
            <div class="topnews">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="item in topNewsList" :key="item.id">
                        <div class="grid-content ep-bg-purple" />
                        <el-card style="max-width: 480px" shadow="hover" @click="handleClick(item.id)">
                            <template #footer>
                                <div>{{ item.title }}</div>
                                <time class="time">{{ editTimeFormat(item.editTime) }}</time>
                            </template>
                            <div class="image"
                                :style="{ backgroundImage: `url(http://127.0.0.1:8089${item.cover})`, backgroundSize: 'cover' }">
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>

            <!-- 新闻选项卡 -->
            <div>
                <el-tabs v-model="whichTable" class="demo-tabs">
                    <el-tab-pane v-for="item in tablelist" :key="item.name" :label="item.label" :name="item.name">
                        <!-- 分类内容 -->
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <div v-for="data in tabnews[item.name]" :key="data.id" style="padding: 10px">
                                    <!-- 新闻卡片 -->
                                    <el-card style="max-width: auto;" shadow="hover" @click="handleClick(data.id)">
                                        <!-- <template #footer> -->
                                        <div class="tab-image"
                                            :style="{ backgroundImage: `url(http://127.0.0.1:8089${data.cover})`, backgroundSize: 'cover' }">
                                        </div>
                                        <div class="article-info" style="padding-top: 10px; margin-left: 170px;">
                                            <div>{{ data.title }}</div>
                                            <div>{{ data.username }}</div>
                                            <div class="tab-time">{{ editTimeFormat(data.editTime) }}</div>
                                        </div>

                                        <!-- </template> -->
                                    </el-card>
                                </div>
                            </el-col>

                            <el-col :span="6">
                                <el-timeline style="max-width: 600px">
                                    <el-timeline-item v-for="(data, index) in tabnews[item.name]" :key="index"
                                        :timestamp="editTimeFormat(data.editTime)">
                                        {{ data.title }}
                                    </el-timeline-item>
                                </el-timeline>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>

                <el-backtop visibility-height="100" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import _ from 'lodash'
import { useRouter } from 'vue-router'

const searchText = ref("");
const visible = ref(false);
// 获取新闻列表
const newslist = ref([])
// 检索结果计算属性 使用过滤器检索和输入文本框里一样的内容
const searchlist = computed(() => searchText.value ? newslist.value.filter(item => item.title.includes(searchText.value)) : [])
onMounted(async () => {
    const res = await axios.get('http://127.0.0.1:8089/webapi/news/list')
    // console.log(res.data);
    newslist.value = res.data.data
    // console.log(_.groupBy(newslist.value,item=>item.category));
})

// 顶部显示4条检索新闻
const topNewsList = computed(() => newslist.value.slice(0, 4))
// 初始化时间函数
const editTimeFormat = (editTime) => {
    const date = new Date(editTime)
    return date.toLocaleString()
}

// 新闻选项卡初始化
const whichTable = ref(1)
// 选项卡列表初始化
const tablelist = [
    {
        label: '最新动态',
        name: 1
    },
    {
        label: '典型案例',
        name: 2
    },
    {
        label: '通知公告',
        name: 3
    },
]
// 新闻分组计算属性
const tabnews = computed(() => _.groupBy(newslist.value, item => item.category))

const router = useRouter()
const handleClick = (id) => {
    // console.log(id);
    router.push(`/new/${id}`)
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}

.news-header {
    width: 100%;
    height: 400px;
    backdrop-filter: cover;
}

.search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.search-item {
    height: 30px;
    line-height: 30px;

    &:hover {
        background: whitesmoke;
    }
}

.topnews {
    margin: 20px;

    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }

    .time {
        font-size: 13px;
        color: gray;
    }
}

.tab-image {
    width: 150px;
    height: 100px;
    background-size: contain;
    float: left;
}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>