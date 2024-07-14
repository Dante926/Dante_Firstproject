<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理" />

        <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFromRules" label-width="80px"
            class="demo-ruleForm" :size="formSize" status-icon>

            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" />
            </el-form-item>

            <el-form-item label="角色" prop="role">
                <el-select placeholder="Select" v-model="userForm.role">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
                <el-upload class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
                    :on-change="handleChange"><!-- 如果:auto-upload=""的值是true，那么上传地址将是action的值-->
                    <img v-if="userForm.avatar" :src="uploadAvatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <!-- 添加用户方法 -->
            <el-form-item>
                <el-col :span="0"></el-col>
                <el-button :span="24" type="primary" @click="submitForm()">
                    添加用户
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
import { useRoute,useRouter } from 'vue-router';

const userFormRef = ref()
const userForm = reactive({
    username: '',
    password: '',
    gender:0, //默认保密 自己在个人中心修改
    role: null, // 1 管理员 2 编辑(普通用户)
    introduction: '',
    avatar: '',
    file: ''
})

const userFromRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入个人介绍', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})

const options = [
    {
        label: '管理员',
        value: 1
    },
    {
        label: '编辑',
        value: 2
    }
]

// 选择图片后的回调(回显)和保存
const handleChange = (file) => {
    // console.log(file.raw);//得到的是图片的原生信息，有了这个信息就可以根据这个信息生成图片的预览
    // 通过获取到的原生信息生成一个图片预览
    userForm.avatar = URL.createObjectURL(file.raw)// 回显头像
    console.log(userForm.avatar);
    userForm.file = file.raw // 将图片信息保存到表单中
}

//头像的计算属性
const uploadAvatar = computed(() => {
    // 如果avatar是blob链接，则直接返回
    if (userForm.avatar.includes('blob:')) {
        return userForm.avatar;
    }
    // 否则，构建完整的后端URL
    // return 'http://127.0.0.1:8089' + store.state.userInfo.avatar;
    return '';
});

const router = useRouter()
// 添加用户信息
const submitForm = () => {
    // 表单需要通过Ref校验
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            /* 
            因为上传图片需要通过axios上传，所以需要将图片信息保存到表单中
            已经将方法封装 
            */
            const res = await upload('http://127.0.0.1:8089/api/user/adduser', userForm);
            if (res.ActionType === 'OK') {
                // store.commit('changeUserInfo', res.date)
                ElMessage.success('添加成功...')
                // router.push(`/user_manage/Userlist`)
                // 重定向
                setTimeout(() => {
                    router.push('/user_manage/Userlist') 
                }, 1500);
            }else {
                ElMessage.error('添加失败，用户名或已存在...')
                console.log(res);
            }
            ;
        };
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>