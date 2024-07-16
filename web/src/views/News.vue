<template>
    <div>
        <div class="container">
            <div class="news-header" :style="{ backgroundImage: `url(${require('@/assets/4.jpg')})` }">
            </div>

            <div class="search">
                <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                    <template #reference>
                        <el-input v-model="searchText" placeholder="请输入关键字" type="search" @input="visible = true"
                            @blur="visible = false" :prefix-icon="Search" size="large" />
                    </template>
                    <div v-if="searchlist.length">
                        <div v-for="data in searchlist" :key="data.id" class="search-item">
                            {{data.title}}
                        </div>
                    </div>
                    <div v-else>
                        <el-empty description="暂无搜索结果" :image-size="50"/>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref,onMounted, computed } from 'vue'
import axios from 'axios'

const searchText = ref("");
const visible = ref(false);

// 获取新闻列表
const newslist = ref([])
// 检索结果计算属性 使用过滤器检索和输入文本框里一样的内容
const searchlist = computed(()=>newslist.value.filter(item=>item.title.includes(searchText.value)))
onMounted(async () => {
    const res = await axios.get('http://127.0.0.1:8089/webapi/news/list')
    console.log(res.data);
    newslist.value = res.data.data
})

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

.search-item{
    height: 30px;
    line-height: 30px;
    &:hover{
        background: whitesmoke;
    }
}
</style>