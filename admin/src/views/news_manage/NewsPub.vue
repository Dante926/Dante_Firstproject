<template>
    <div>
        <el-card>
            <el-page-header content="新闻列表" icon="" title="新闻管理" />

            <el-table :data="tableData" style="width: 100%">

                <el-table-column prop="title" label="标题" width="auto" />

                <el-table-column prop="category" label="分类" width="auto">
                    <!-- 自定义插槽内容 -->
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>

                <el-table-column prop="editTime" label="更新时间" width="auto">
                    <!-- 自定义插槽内容 -->
                    <template #default="scope">
                        {{ editTimeFormat(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column prop="isPublish" label="是否发布" width="auto">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value='1' :inactive-value='0'
                            @change="handleSwitch(scope.row)" />
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">

                        <el-button circle :icon="View" type="primary" size="small" @click="handlePreView(scope.row)" />

                        <el-popconfirm title="跳转编辑?" confirmButtonText="是" cancelButtonText="否"
                            @confirm="handleEdit(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Edit" size="small" />
                            </template>
                        </el-popconfirm>

                        <el-popconfirm title="是否删除?" confirmButtonText="是" cancelButtonText="否"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Delete" type="danger" size="small" />
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>

            </el-table>

        </el-card>

        <!-- 预览弹窗 -->
        <el-dialog title="新闻预览" v-model="dialogVisble" width="50%">
            <h2>{{ preViewData.title }}</h2>
            <div>{{ preViewData.editTime }}</div>
            <div>
                <el-divider border-style="dashed" /> <!-- 分割线 -->
            </div>
            <div v-html="preViewData.content"></div>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import { Edit, Star, Delete, View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

// 获取数据
const store = useStore();
const tableData = ref([])
onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const username = store.state.userInfo.username;
    console.log(username);
    const res = await axios.get(`http://127.0.0.1:8089/api/news/getperlist/${username}`)
    // 判断res返回的长度，如果只有一条数据那就先将数据转换成数组在存进tableData中，如果有多条数据说明已经是数组直接存进tableData中
    if (res.data.data.length == 1) {
        const responseData = res.data.data;
        tableData.value = Array.isArray(responseData) ? responseData : [responseData];
    } else {
        tableData.value = res.data.data
    }
}

// 分类格式化category
const categoryFormat = (category) => {
    const arr = ['最新动态', '典型案列', '通知公告']
    return arr[category - 1]
}

// 编辑时间格式化editTime
const editTimeFormat = (editTime) => {
    const date = new Date(editTime)
    return date.toLocaleString()
}

// 是否发布更改方法
const handleSwitch = async (item) => {
    console.log(item);
    const res = await axios.put(`http://127.0.0.1:8089/api/news/publish`, {
        id: item.id,
        isPublish: item.isPublish
    })
    if (res.data.ActionType == 'OK') {
        ElMessage.success('修改成功')
    } else {
        ElMessage.error('修改失败')
    }
}

/* 操作方法回调 */
// 预览操作
const dialogVisble = ref(false)
const preViewData = ref({})
const handlePreView = (data) => {
    console.log(data);
    preViewData.value = data
    preViewData.value.editTime = editTimeFormat(data.editTime)
    dialogVisble.value = true
}

// 编辑操作
const router = useRouter()
const handleEdit = (item) => {
    router.push(`/news_manage/editnews/${item.id}`)
}

// 删除操作
const handleDelete = async (item) => {
    console.log(item);
    const res = await axios.delete(`http://127.0.0.1:8089/api/news/deletenews/${item.id}`)
    if (res.data.ActionType == 'OK') {
        console.log(res.data);
        ElMessage.success('删除成功')
        getTableData()
    } else {
        ElMessage.error('删除失败' + res.data.message)
    }
}

</script>