<template>
  <el-dialog v-model="dialogVisible" title="动作类型管理" width="100vh" :before-close="handleActionTypeDialogClose">
    <el-row :gutter="20">
      <el-col :span="4" :offset="20">
        <div class="addbutton">
          <!-- 加 （） 不带值 -->
          <el-button type="primary" @click="handleAddActionType()">新增</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 这个地方放表格  -->

    <el-table :data="tableData" border height="250" style="width: 100%">
      <el-table-column :width="item.width" :prop="item.prop" :label="item.label"
        v-for="(item, index) in actiontypedialogoptions" :key="index">

        <!-- 结构出 row ，再将row传过去 -->
        <template #default="{ row }" v-if="item.prop === 'action'">
          <!-- <el-button type="primary">新增</el-button> -->
          <!-- <el-button type="warning" @click="update(row)">更新</el-button> -->
          <el-button type="warning" @click="handleAddActionType(row)">更新</el-button>
          <el-button type="danger" @click="deleteAddActionType(row)">删除</el-button>
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
        <!-- <el-button type="primary" @click="dialogVisible2 = false">确认</el-button> -->
        <el-button type="primary" @click="handleActionTypeDialogClose">确认</el-button>

      </span>
    </template>
  </el-dialog>
  <!-- v-model="addActionTypeDialog"绑定是否展示对话框 -->
  <!-- v-if="addActionTypeDialog" 每次新增弹出对话框都是新的值（对话框全部置空） -->
  <!-- :dialogTitle="dialogTitle" 将 dialogTitle的值传过去 -->
  <ad-ac-type-dialog v-model:actionTypeDialogVisible="addActionTypeDialog" @initList="initgetAllActionTypeList"
    :dialogTitle="dialogTitle" :dialogTableValue="dialogTableValueStatus" />
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { actiontypedialogoptions } from './actiontypedialogoptions.js'
import {
  getAllActionType,
  insertActionType,
  updateActionType,
  deleteActionType
} from '@/api/sportManagement/action.js'
import adAcTypeDialog from './components/addActionTypeDialog.vue'  // 导入子组件
import { isNull } from '@/utils/filters'


const tableData = ref([])
const total = ref(0)
const dialogTitle = ref('')   // 定义标题
const addActionTypeDialog = ref(false)    // 初始化对话框（是否展示）
const dialogTableValueStatus = ref({})      // 定义表单时（用于判断表单获取过来的数据是否为空，之后进行判断执行新增还是更新操作），新增 或 更新

// defineProps在父组件（）
const prop = defineProps({
  dialogVisible: Boolean
})

const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})


const emits = defineEmits(['update:dialogVisible'])

const handleActionTypeDialogClose = () => {
  emits('update:dialogVisible', false)    // 更新 dialogVisible 为 false
}

// 更新数据（重新获取数据刷新）
const initgetAllActionTypeList = async () => {
  const res = await getAllActionType(queryForm.value)
  console.log(res)
  tableData.value = res.body
}


//#region 
// const update = (row) => {
//   console.log('更新');
//   if (!isNull(row)){
//     // 更新操作
//     title.value = JSON.parse(JSON.stringify(row))

//   }
// }

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
//#endregion


// 新增、更新
const handleAddActionType = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加'   // 空值为 添加用户
    dialogTableValueStatus.value = {}
  } else {
    dialogTitle.value = '更新'
    dialogTableValueStatus.value = JSON.parse(JSON.stringify(row))    // 深拷贝，拷贝一份相同的数据进行编辑
  }
  addActionTypeDialog.value = true   // 显示对话框
}

// 删除
const deleteAddActionType = (row) => {
  console.log(row);   // 一个 Proxy 对象

  ElMessageBox.confirm(
    '确认删除？',
    '删除警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await deleteActionType({ id: row.id })     // 加 {key : value}
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      initgetAllActionTypeList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}


initgetAllActionTypeList()
// getList()
</script>

<style scoped>
.addbutton {
  bottom: 3px;
}
</style>
