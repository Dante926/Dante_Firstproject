<template>
    <div class="container">
        <el-carousel height="calc(100vh - 59px)">
            <el-carousel-item v-for="(image, index) in images" :key="index">
                <div class="carousel-image"
                    :style="{ backgroundImage: 'url(' + require(`@/assets/${image}.jpg`) + ')' }"></div>
            </el-carousel-item>
        </el-carousel>
        <div class="center">互联网+时代</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: ['冬', '4', '19'] // 图片文件名，不含扩展名
        };
    }
};
</script>

<style scoped lang="scss">
.container {
    .carousel-image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }
}

.container {
    position: relative;
}

.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color: white;
    text-align: center;
    opacity: 0.5; /* 添加透明度属性，可以调整透明度值 */
}
</style>