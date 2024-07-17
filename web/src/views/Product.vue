<template>
    <div>
        <!-- 走马灯效果 -->
        <el-carousel height="calc(100vh - 59px)" direction="vertical" motion-blur :autoplay="false"
            v-if="looplist.length">
            <el-carousel-item v-for="item in looplist" :key="item.id">
                <div class="item" :style="{ backgroundImage: `url(http://127.0.0.1:8089${item.cover})` }">

                    <!-- 产品信息 -->
                    <el-card class="box-card" style="max-width: 480px">
                        <template #header>
                            <div class="card-header">
                                <h2>{{ item.title }}</h2>
                            </div>
                        </template>
                        <div>{{item.introduction}}</div>
                        <div class="detail">{{item.detail}}</div>
                        <div class="more">
                            更多信息,请访问:
                            <br>
                            wx:...
                            <br>
                            qq:...
                        </div>
                    </el-card>

                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty description="暂无搜索结果" v-else image-size="70vh" />

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';

onMounted(async () => {
    const res = await axios.get('http://127.0.0.1:8089/webapi/product/list')
    console.log(res.data);
    looplist.value = res.data.data
})

const looplist = ref([])
</script>

<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
}

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

.item {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.box-card{
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
}

.detail,.more{
    margin-top: 20px;
}
</style>