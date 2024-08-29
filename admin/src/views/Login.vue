<!-- 
    # 作责：百院俄珀
    # QQ  ：2802471732
-->

<!-- 
    # 此路由用作 登录时的前端页面
-->

<template>
    <div>
        <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="options" />
    </div>

        <div class="formContaine">
        <h3>百院门户管理系统</h3>
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px"
            class="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>

<script setup>
import { loadSlim } from "tsparticles-slim";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";// 引入路由操作
import axios from "axios";
import { ElMessage } from 'element-plus';// 引入提示框element
import { useStore } from "vuex";

// 调用仓库
const store = useStore();

// 表单的响应对象
const loginForm = reactive({
    username: "",
    password: ""
})

// 表单的引用对象
const loginFormRef = ref()

// 校验规则对象
/* const loginRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
    ]
}) */

const router = useRouter() // 获取路由对象
// 提交表单函数
const submitForm = () => {
    loginFormRef.value.validate(
        (valid) => {
            if (valid) {
                axios.post("http://127.0.0.1:8089/api/user/login", {
                    username: loginForm.username,
                    password: loginForm.password
                }).then(res => {
                    console.log(res.data);
                    if (res.data.message == "OK") {
                        ElMessage({
                            message: '欢迎进入百院门户管理系统~',
                            type: 'success',
                        })
                        store.commit("changeUserInfo", res.data.data)
                        router.push('/index') 
                    } else {
                        ElMessage({
                            message: '用户名或密码错误...',
                            type: 'error',
                            plain: true,
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    )
}

const options = {
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}

const particlesInit = async engine => {
    //await loadFull(engine);
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};
</script>

<!-- 局部样式 -->
<style lang="scss" scoped>
.formContaine {
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    padding: 20px;

    h3 {
        font-size: 30px;
        color: white;
    }

    .loginForm {
        margin-top: 20px
    }
}

:deep(.el-form-item label) {
    color: white;
}
</style>