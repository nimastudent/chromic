<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row :gutter="24" style="margin: 5px 0">
      <el-row>
        <el-button
          type="primary"
          @click="addNewNotice"
          style="margin-left: 10px"
          >新增公告</el-button
        >
      </el-row>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      :border="true"
      :height="cardHeight"
      highlight-current-row
      style="font-size: 1rem"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'action'">
          <el-button @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
        </template></el-table-column
      >
    </el-table>

    <Pagination
      :total="total"
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNum="queryForm.pageNum"
      @updateList="getList"
    />
  </el-card>

  <AnnouncementsDialog
    v-model:dialogVisible="dialogVisible"
    :dialogStatus="dialogStatus"
    :title="title"
    :editData="editData"
    @updateList="getList"
  />
</template>

<script setup>
import {
  getNoticeByAdmin,
  getNoticeByUser,
  deleteNotice,
} from '@/api/announcements/index'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { options } from './options'
import { useStore } from 'vuex'
import Pagination from '@/components/pagination/index.vue'
import AnnouncementsDialog from '@/views/main/announcements/components/announcementsDialog.vue'
import { getHeightWithOutHeader } from '@/utils/params/height'

const cardHeight = getHeightWithOutHeader()
const store = useStore()

// 表格数据
const tableData = ref([])
// 对话框显示
const dialogVisible = ref(false)
const dialogStatus = ref('')
const title = ref('')
const loading = ref(false)
const total = ref(0)
const editData = ref()
const queryForm = reactive({
  pageNum: 1,
  pageSize: 10,
})

// 获取目前是账户身份
const role = store.state.user.role

// 获取新的信息
const getList = async () => {
  loading.value = true
  if (role === 'staff') {
    const res = await getNoticeByAdmin(queryForm)
    tableData.value = res.body.content
    total.value = res.body.totalSize
    loading.value = false
  } else if (role === 'admin') {
    const res = await getNoticeByUser(queryForm)
    tableData.value = res.body.content
    loading.value = false
  }
}

// 修改表格信息
const handleEdit = (row) => {
  dialogStatus.value = 'change'
  editData.value = row
  title.value = '修改公告'
  dialogVisible.value = true
}

// 删除表格信息
const handleDelete = (row) => {
  ElMessageBox({
    title: '警告',
    message: '是否删除该信息',
    type: 'warning',
    showCancelButton: true,
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        await deleteNotice({ id: row.id })
        getList()
        ElMessage({ type: 'success', message: '删除成功!' })
        done()
      } else {
        ElMessage({ type: 'info', message: '取消成功!' })
        done()
      }
    },
  })
}

// 添加新的公告
const addNewNotice = () => {
  editData.value = {}
  title.value = '添加新公告'
  dialogStatus.value = 'add'
  dialogVisible.value = true
}

getList()
</script>

<style lang="scss" scoped>
.patient-name-contianer {
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
