<template>
    <div>
        <el-page-header content="添加新闻" icon="" title="新闻管理" />

        <el-form ref="newsFormRef" style="max-width: 1080px" :model="newsForm" :rules="newsFromRules" label-width="100px"
            class="demo-ruleForm" :size="formSize" status-icon>

            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>

            <el-form-item label="内容" prop="content">
                <editor @event="handleChange" />
            </el-form-item>

            <el-form-item label="类别" prop="category">
                <el-select placeholder="Select" v-model="newsForm.category">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="联系" prop="title">
                <el-input v-model="newsForm.call" />
            </el-form-item>

            <el-form-item label="封面" prop="cover">
                <el-upload class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
                    :on-change="handleChangecover"><!-- 如果:auto-upload=""的值是true，那么上传地址将是action的值-->
                    <img v-if="newsForm.cover" :src="uploadcover" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <!-- 添加新闻方法 -->
            <el-form-item>
                <el-col :span="0"></el-col>
                <el-button :span="24" type="primary" @click="submitForm()">
                    添加新闻
                </el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import editor from '@/components/editor/Editor'
import { Plus } from '@element-plus/icons-vue'
import upload from '@/util/upload';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';

const router = useRouter()
const newsFormRef = ref()
const store = useStore();
const newsForm = reactive({
    call:'',
    title: '',
    content: '',
    category: null, // 1 最新动态  2 典型案列 3 通知公告
    cover: '',
    file: null,
    isPublish: 0, // 0 未发布 1 已发布
    username:store.state.userInfo.username
})
const newsFromRules = reactive({
    call: [
        { required: true, message: '请输入联系方式', trigger: 'blur' },
        { min: 3, max: 45, message: '长度在 3 到 45 个字符', trigger: 'blur' }
    ],
    title: [
        { required: true, message: '请输入新闻标题', trigger: 'blur' },
        { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入新闻内容', trigger: 'blur' },
    ],
    category: [
        { required: true, message: '请选择分类', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传图片', trigger: 'blur' },
    ],
})
// 新闻类别
const options = [
    { value: 1, label: '最新动态' },
    { value: 2, label: '典型案例' },
    { value: 3, label: '通知公告' },
]
// 封面
const uploadcover = computed(() => {
    // 如果avatar是blob链接，则直接返回
    if (newsForm.cover.includes('blob:')) {
        return newsForm.cover;
    }
    // 否则，构建完整的后端URL
    // return 'http://127.0.0.1:8089' + store.state.userInfo.avatar;
    return '';
});
// 图片回显
const handleChangecover = (file) => {
    newsForm.cover = URL.createObjectURL(file.raw);
    console.log(newsForm.cover);
    newsForm.file = file.raw;
}
// 监听富文本编辑器内容变化(editor内容改变的回调)
const handleChange = (data) => {
    console.log(data);
    newsForm.content = data
}
// 添加新闻方法
const submitForm = ()=>{
    // 校验表单
    newsFormRef.value.validate(async (valid)=>{
        if(valid){
            console.log(newsForm);
            const res = await upload('http://127.0.0.1:8089/api/news/addnew', newsForm)
            if(res.ActionType === 'OK'){
                ElMessage({
                    type: 'success',
                    message: res.message
                })
                //刷新页面
                setTimeout(() => {
                    router.go(0)

                }, 800);
            }else{
                ElMessage({
                    type: 'error',
                    message: res.message
                })
            }
        }
    })
}
</script>

<style scoped lang="scss">
.el-form {
    margin-top: 50px;
}
</style>