<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row :gutter="24" style="margin: 5px 0">
      <el-row :span="4">
        <el-button type="primary" @click="handleCreate">新增指导</el-button>
      </el-row>
      <el-row :span="1" class="patient-name-contianer"> 患者姓名： </el-row>
      <el-row :span="7">
        <el-input v-model="queryForm.patientName" clearable></el-input>
      </el-row>
      <el-row>
        <el-button type="primary" @click="getList" style="margin-left: 10px"
          >搜素</el-button
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
        <template v-if="item.prop === 'action'" v-slot="{ row }">
          <el-button @click="handleDelete(row)" type="danger"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup>
import {
  getAllHuibaoForDoc,
  getAllHuibaoForAdm
} from '@/api/foodManagement/foodreport.js'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'

const store = useStore()
const role = store.state.user.role
const cardHeight = getHeightWithOutHeader()

const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})

const tableData = ref([])
const loading = ref(false)
const getList = () => {
  if (role === 'admin') {
    // addItem()
    getListForAdm()
  } else if (role === 'staff') {
    getListForDoc()
  }
}

const getListForDoc = async () => {
  const res = await getAllHuibaoForDoc(queryForm.value)
  if (res.success) {
    console.log(res)
    tableData.value = res.body.content
  }
}

const getListForAdm = async () => {
  const res = await getAllHuibaoForAdm(queryForm.value)
  if (res.success) {
    console.log(res)
    tableData.value = res.body.content
  }
}

getList()
</script>
<style lang="scss" scoped></style>
