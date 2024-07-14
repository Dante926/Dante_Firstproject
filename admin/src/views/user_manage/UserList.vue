<template>
    <div>
        <el-page-header content="用户列表" icon="" title="用户管理" />
        <el-card>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180" />

                <!-- 头像显示 -->
                <el-table-column label="头像" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="80" :src="'http://127.0.0.1:8089' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="80"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        </div>
                    </template>
                </el-table-column>

                <!-- 角色身份 -->
                <el-table-column label="角色">
                    <template #default="scope">
                        <!-- {{scope.row.role === 1? '管理员' : '编辑'}} -->
                        <el-tag type="danger" v-if="scope.row.role === 1">管理员</el-tag>
                        <el-tag type="success" v-else>编辑者</el-tag>
                    </template>
                </el-table-column>

                <!-- 操作管理 -->
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>

                        <el-popconfirm title="是否删除?" confirmButtonText="是" cancelButtonText="否"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>

        <!-- 编辑对话框组件 -->
        <el-dialog v-model="dialogVisible" title="编辑信息" width="500">
            <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFromRules"
                label-width="80px" class="demo-ruleForm" :size="formSize" status-icon>

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
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { onMounted, ref, reactive } from 'vue'
    import { ElMessage } from 'element-plus';

    const tableData = ref([])
    const dialogVisible = ref(false) //编辑对话款，默认不显示
    const userFormRef = ref();
    const userForm = reactive({
        username: '',
        password: '',
        role: null, // 1 管理员 2 编辑(普通用户)
        introduction: '',
        id: ''
    })
    const userFromRules = reactive({
        username: [
            { required: true, message: '请输入名字', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]+$/, message: '密码只能包含数字和字母', trigger: 'blur' },
            { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
        ],
        role: [
            { required: true, message: '请选择权限', trigger: 'blur' },
        ],
        introduction: [
            { required: true, message: '请输入个人介绍', trigger: 'blur' },
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

    // 获取tableData数据
    onMounted(() => {
        getTableData()
    })
    const getTableData = async () => {
        const res = await axios('http://127.0.0.1:8089/api/user/getuserlist')
        console.log(res.data);
        tableData.value = res.data.data
    }

    /* 操作管理方法 */
    // 编辑操作
    const handleEdit = (data) => {
        // console.log(data.username);
        userForm.username = data.username
        userForm.password = '********'
        userForm.role = data.role
        userForm.introduction = data.introduction
        userForm.id = data.id
        dialogVisible.value = true
        console.log(userForm);
    }
    const handleEditConfirm = () => {
        // 编辑确认回调
        userFormRef.value.validate(async (valid) => {
            if (valid) {
                // console.log(userForm);
                // 更新用户后端
                const res = await axios.put(`http://127.0.0.1:8089/api/user/putuserlist/${userForm.id}`, userForm)
                // console.log(res.data.ActionType);
                if (res.data.ActionType === 'OK') {
                    // 提示
                    ElMessage.success(res.data.message)
                    // 弹框隐藏
                    dialogVisible.value = false
                    // 刷新table数据
                    getTableData()
                } else {
                    ElMessage.error(res.data.message)
                }
            }
        })
    }
    //删除操作
    const handleDelete = async (data) => {
        // console.log(data);
        const res = await axios.delete(`http://127.0.0.1:8089/api/user/getuserlist/${data.id}`)
        // 如果后端返回状态为OK则弹窗提示
        if (res.data.ActionType === 'OK') {
            ElMessage.success('删除成功')
            setTimeout(() => {
                // 重新加载页面或列表
                getTableData()
            }, 1500);
        } else {
            ElMessage.error('删除失败')
            console.log(res.data.message);
        }
    }
</script>

<style lang="scss" scoped></style>