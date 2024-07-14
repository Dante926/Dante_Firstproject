<template>
    <div>
        <el-page-header content="添加产品" icon="" title="产品管理" />

        <el-form ref="productFormRef" style="max-width: 600px" :model="productForm" :rules="productRules"
            label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>

            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>

            <el-form-item label="产品简要描述" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="产品详细描述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />
            </el-form-item>

            <el-form-item label="产品图片" prop="cover">
                <el-upload class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
                    :on-change="handleChange"><!-- 如果:auto-upload=""的值是true，那么上传地址将是action的值-->
                    <img v-if="productForm.cover" :src="uploadcover" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <!-- 添加用户方法 -->
            <el-form-item>
                <el-col :span="4"></el-col>
                <el-button :span="19" type="primary" @click="submitForm()">
                    添加产品
                </el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import upload from '@/util/upload';
import { Plus } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';

const productFormRef = ref()
const store = useStore();
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '',
    file: '',
    username: store.state.userInfo.username,
})
const productRules = reactive({
    title: [
        { required: true, message: '请输入产品名称', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入产品简要介绍', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入产品详细介绍', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传产品图像', trigger: 'blur' },
    ],
})

// 选择图片后的回调(回显)和保存
const handleChange = (file) => {
    // console.log(file.raw);//得到的是图片的原生信息，有了这个信息就可以根据这个信息生成图片的预览
    // 通过获取到的原生信息生成一个图片预览
    productForm.cover = URL.createObjectURL(file.raw)// 回显头像
    console.log(productForm.cover);
    productForm.file = file.raw // 将图片信息保存到表单中
}

//封面的计算属性
const uploadcover = computed(() => {
    // 如果avatar是blob链接，则直接返回
    if (productForm.cover.includes('blob:')) {
        return productForm.cover;
    }
    // 否则，构建完整的后端URL
    // return 'http://127.0.0.1:8089' + store.state.userInfo.avatar;
    return '';
});

// 添加产品信息
const router = useRouter()
const submitForm = () => {
    // 表单需要通过Ref校验
    productFormRef.value.validate(async (valid) => {
        console.log(productForm);
        if (valid) {
            const res = await upload('http://127.0.0.1:8089/api/product/addproduct', productForm);
            if (res.ActionType === 'OK') {
                ElMessage.success(res.message)
                router.push('/product_manage/productlist')
            } else {
                ElMessage.error(res.message)
            }
        } else {
            ElMessage.error('添加失败...')
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>