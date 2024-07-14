<template>
    <div>
        <el-card>
            <el-page-header content="产品列表" icon="" title="产品管理" />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="产品名称" width="auto" />

                <el-table-column prop="title" label="简要描述" width="auto" />

                <el-table-column prop="editTime" label="更新时间" width="auto">
                    <!-- 自定义插槽内容 -->
                    <template #default="scope">
                        {{ editTimeFormat(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">

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

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { Edit,Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 获取数据
const tableData = ref([])
onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const res = await axios.get('http://127.0.0.1:8089/api/product/getlist')
    tableData.value = res.data.data
}

// 编辑时间格式化editTime
const editTimeFormat = (editTime) => {
    const date = new Date(editTime)
    return date.toLocaleString()
}

/* 操作方法回调 */
// 编辑操作
const router = useRouter()
const handleEdit = (item) => {
    router.push(`/product_manage/editproduct/${item.id}`)
}
// 删除操作
const handleDelete = async (item) => {
    const res = await axios.delete(`http://127.0.0.1:8089/api/product/delproduct/${item.id}`)
    if (res.data.ActionType == 'OK') {
        ElMessage.success('删除成功')
        getTableData()
    } else {
        ElMessage.error('删除失败' + res.data.message)
    }
}

</script>