<template>
  <el-dialog v-model="dialogVisible" title="动作类型管理" width="100vh" :before-close="handleActionTypeDialogClose">
    <el-row :gutter="20">
      <el-col :span="4" :offset="20">
        <div class="addbutton">
          <el-button type="primary" @click="handleAddActionType">新增</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 这个地方放表格  -->

    <el-table :data="tableData" border height="250" style="width: 100%">
      <el-table-column :width="item.width" :prop="item.prop" :label="item.label"
        v-for="(item, index) in actiontypedialogoptions" :key="index">

        <template #default="{row}" v-if="item.prop === 'action'">
          <!-- <el-button type="primary">新增</el-button> -->
          <el-button type="warning" @click="update(row)">更新</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <!-- <Pagination
      :total="total"
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNum="queryForm.pageNum"
      @updateList="getList"
    /> -->

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleActionTypeDialogClose">取消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <ad-ac-type-dialog v-model="addActionTypeDialog" v-if="addActionTypeDialog" @initList="initgetAllActionTypeList" :titleValue="titleValue" />
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { actiontypedialogoptions } from './actiontypedialogoptions.js'
import {
  getAllActionType,
  insertActionType,
  updateActionType,
  deleteActionType
} from '@/api/sportManagement/action.js'
import adAcTypeDialog from './components/addActionTypeDialog.vue'
import {isNull} from '@/utils/filters'


const total = ref(0)
const titleValue = ref({})

const prop = defineProps({
  dialogVisible: Boolean
})

const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})

const addActionTypeDialog = ref(false)    // 初始化对话框（是否展示）

// 你这个 dialog  已经可以 正常 使用了 下一步 就是把 获取数据 表格显示出来 就可以了
const emits = defineEmits(['update:dialogVisible'])

const handleActionTypeDialogClose = () => {
  emits('update:dialogVisible', false)
}

const initgetAllActionTypeList = async () => {
  const res = await getAllActionType(queryForm.value)
  console.log(res)
  tableData.value = res.body
}

const update = (row) => {
  console.log('更新');
  if (!isNull(row)){
    // 更新操作
    titleValue.value = JSON.parse(JSON.stringify(row))

  }
}

// const getList = async () => {
//   const res = await getAllActionType(queryForm.value)
//   // console.log(res)
//   if (res.success) {
//     tableData.value = res.body.content
//     total.value = res.body.totalSize
//   }
// }

// 取消确认是否关闭？
// const handleActionTypeDialogClose = (done: () => void) => {
//   ElMessageBox.confirm('确认关闭吗？')
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }

const handleAddActionType = () => {
  addActionTypeDialog.value = true
}

const tableData = ref([])

initgetAllActionTypeList()
// getList()
</script>

<style scoped>
.addbutton {
  bottom: 3px;
}
</style>
