<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row :gutter="24" style="margin: 5px 0">
      <el-row :span="4">
        <el-button @click="handleCreate" type="primary">新增动作</el-button>
        <el-button @click="handleActiontype" type="primary">动作类型管理</el-button>
        <!-- <el-button text @click="actionTypeDialogVisible = true" type="primary">动作类型管理</el-button> -->
      </el-row>

      <el-row :span="1" class="patient-name-contianer"> 动作类型： </el-row>
      <el-row :span="7">
        <el-select v-model="queryForm.actionType" placeholder="请选择" clearable>
          <el-option v-for="(item, index) in actionTypeOptions" :key="index" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <el-button type="primary" @click="getList" style="margin-left: 10px">搜索</el-button>
      </el-row>
    </el-row>
    <el-table v-loading="loading" :data="tableData" stripe :border="true" :height="cardHeight" highlight-current-row
      @current-change="handleCurrentChange" style="font-size: 1rem">
      <el-table-column v-for="(item, index) in options" :key="index" :prop="item.prop" :label="item.label"
        :width="item.width">
        <template v-slot="{ row }" v-if="item.prop === 'action'">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-upload class="upload-demo" :action="uploadUrl" :limit="1" :data="{ id: row.id }" name="picture"
                :with-credentials="true" :on-success="handleSuccess">
                <el-button type="primary">设置背景图片</el-button>
              </el-upload>
            </el-col>
            <el-col :span="8">
              <el-button @click="handleSelect(row)">查看详细</el-button>
            </el-col>
            <el-col :span="7">
              <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="total" v-model:pageSize="queryForm.pageSize" v-model:pageNum="queryForm.pageNum"
      @updateList="getList" />
  </el-card>

  <!-- 这个actionTypeDialogVisible -->
  <updata-dialog v-model:dialogVisible="dialogVisible" @updateList="getList" :actionTypeOptions="actionTypeOptions"
    :d="dialogStatus" :actionData="actionData" />
  <ac-type-dialog v-model:dialogVisible="actionTypeDialogVisible" />
</template>

<script setup>
import updataDialog from './components/updataDialog.vue'
import acTypeDialog from './components/actionTypeDialog.vue'
// 这个是你写的 动作类型 对话框  引用的vue还是那个update的
// 然后没有在 template 里写上
// 这个爆红是因为  vetur 是 vue2 的代码提示插件  volar 是3的
import Pagination from '@/components/pagination/index.vue'

import { computed, ref } from 'vue'
import { getHeightWithOutHeader } from '@/utils/params/height'
import {
  getAllAction,
  getActionById,
  deleteAction
} from '@/api/sportManagement/action.js'
import { options } from './options'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getURl } from '@/api/request'

const cardHeight = getHeightWithOutHeader()

const uploadUrl = computed(() => {
  return `${getURl()}/action/manage/setPicture`
})

const dialogVisible = ref(false)
const actionTypeDialogVisible = ref(false) // 动作类型管理

const loading = ref(false)
const total = ref(0)
const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})
const actionTypeOptions = [
  {
    value: '有氧运动'
  },
  {
    value: '抗阻训练'
  },
  {
    value: '柔韧训练'
  }
]
const dialogStatus = ref('')
const tableData = ref([])
const actionData = ref({})

const getList = async () => {
  loading.value = true
  const res = await getAllAction(queryForm.value)
  if (res.success) {
    tableData.value = res.body.content
    total.value = res.body.totalSize
    loading.value = false
  }
}

const handleSelect = async (row) => {
  const res = await getActionById({ id: row.id })
  if (res.success) {
    actionData.value = res.body
    dialogStatus.value = 'edit'
    dialogVisible.value = true
  }
}

const handleCreate = () => {
  // 你看这个 方法   单击后执行的  是将一个 visible 改为 true  然后设置status 为 add
  // 这些是传给 updateDIalog 的
  dialogStatus.value = 'add'
  dialogVisible.value = true
}

// 动作类型管理方法
const handleActiontype = () => {
  // 你这个  首先 要把 actionTypedialog  引入  template 然后 给他绑定 visible
  actionTypeDialogVisible.value = true
}

const handleSuccess = (res, file, files) => {
  console.log(res)
  if (res.success) {
    ElMessage({
      type: 'success',
      message: '上传成功'
    })
  }
}

const handleDelete = async (id) => {
  ElMessageBox.confirm('请确认是否删除该动作', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteAction({ id })
      if (res.success) {
        getList()
        ElMessage({
          type: 'success',
          message: '删除成功！'
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
}

const handleCurrentChange = () => { }

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
