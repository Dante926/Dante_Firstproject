<template>
    <div>
        <el-page-header content="个人中心" icon="" title="企业门户管理系统" />

        <el-row :gutter="20" class="el-row">
            <!--  -->
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <div>{{ store.state.userInfo.username }}</div>
                    <div>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</div>
                </el-card>
            </el-col>

            <el-col :span="16">
                <el-card style="max-width: 100%;">
                    <template #header>
                        <div class="card-header">
                            <span>百院产品</span>
                        </div>
                    </template>
                    <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFromRules"
                        label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>

                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-select placeholder="Select" v-model="userForm.gender">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="个人简介" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>

                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader"
                                action=""
                                :show-file-list="false" :auto-upload="false" :on-change="handleChange"><!-- 如果:auto-upload=""的值是true，那么上传地址将是action的值-->
                                <img v-if="userForm.avatar" :src="uploadAvatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>

                        <el-form-item>
                            <el-col :span="3"></el-col>
                            <el-button :span="19" type="primary" @click="submitForm()">
                                更新信息
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import { useStore } from 'vuex';
    import { computed, ref, reactive } from 'vue';
    import { Plus } from '@element-plus/icons-vue'
    // import axios from 'axios'; //我们已经用了自己的封装upload了，如果用到其他的axios才解封这条代码
    import { ElMessage } from 'element-plus';
    import upload from '@/util/upload';

    const store = useStore();

    const userFormRef = ref() // 将该值绑定到表单上 el-form ref="userFormRef"

    const { username, gender, introduction, avatar } = store.state.userInfo

    const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://127.0.0.1:8089' + store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)

    const userForm = reactive({
        username,
        gender,
        introduction,
        avatar,
        file: ""
    })

    const userFromRules = reactive({
        username: [
            { required: true, message: '请输入名字', trigger: 'blur' },
        ],
        gender: [
            { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        introduction: [
            { required: true, message: '个人介绍', trigger: 'blur' },
        ],
        avatar: [
            { required: true, message: '上传头像', trigger: 'blur' },
        ],
    })

    const options = [
        {
            label: '保密',
            value: 0
        },
        {
            label: '男',
            value: 1
        },
        {
            label: '女',
            value: 2
        }
    ]

    // 选择图片后的回调(回显)
    const handleChange = (file) => {
        // console.log(file.raw);//得到的是图片的原生信息，有了这个信息就可以根据这个信息生成图片的预览
        // 通过获取到的原生信息生成一个图片预览
        userForm.avatar = URL.createObjectURL(file.raw)// 回显头像
        console.log(userForm.avatar);
        userForm.file = file.raw // 将图片信息保存到表单中
    }

    const uploadAvatar = computed(() => {
        // 如果avatar是blob链接，则直接返回
        if (userForm.avatar.includes('blob:')) {
            return userForm.avatar;
        }
        // 否则，构建完整的后端URL
        return 'http://127.0.0.1:8089' + userForm.avatar;
    });

    // 提交表单(更新用户信息)
    const submitForm = () => {
        //提交表单前把数据情况初始化
        // 表单需要通过Ref校验
        userFormRef.value.validate(async (valid) => {
            if (valid) {
                /* 
                因为上传图片需要通过axios上传，所以需要将图片信息保存到表单中
                已经将方法封装 
                */
                const res = await upload('http://127.0.0.1:8089/api/user/uploads', userForm);
                if (res.ActionType === 'OK') {
                    store.commit('changeUserInfo', res.date)
                    ElMessage.success('更新成功')
                    // 刷新页面
                    // window.location.reload(); //对用户体验不友好对浏览器负担大
                }else {
                    console.log(res);
                    ElMessage.error(res.message)
                }
                ;
            };
        })
    }
</script>

<style lang="scss">
    .el-row {
        margin-top: 20px;

        .box-card {
            text-align: center;
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
    }
</style>