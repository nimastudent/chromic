<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row :gutter="24" style="margin: 5px 0">
      <el-row :span="4"> </el-row>
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
      @current-change="handleCurrentChange"
      style="font-size: 1rem"
    >
      <el-table-column
        v-for="(item, index) in options"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'action'">
          <el-button @click="handleHuiBao(row)">查看处方</el-button>
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
</template>

<script setup>
import Pagination from '@/components/pagination/index.vue'

import { ref } from 'vue'
import { useStore } from 'vuex'
import {
  getAllChuFangForAdm,
  getAllChuFangForDoc,
  getActionList,
  getChuFangByIdForDoc,
  getChuFangByIdForAdm
} from '@/api/sportManagement/actionChuFang'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { options, addDoctor } from './options'

const cardHeight = getHeightWithOutHeader()

const store = useStore()
const role = store.state.user.role
console.log(role)

const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})

const total = ref(0)

const loading = ref(true)
const tableData = ref([])
const getList = async () => {
  if (role === 'admin') {
    const res = await getAllChuFangForAdm(queryForm.value)
    if (res.success) {
      tableData.value = res.body.content
      total.value = res.body.totalSize
      loading.value = false
    }
  } else if (role === 'staff') {
    const res = await getAllChuFangForDoc(queryForm.value)
    if (res.success) {
      tableData.value = res.body.content
      total.value = res.body.totalSize
      loading.value = false
    }
  }
}

const actionList = ref([])
const getAcionList = async () => {
  const res = await getActionList()
  if (res.success) {
    console.log(res)
    actionList.value = res.body
  }
}

const handleCurrentChange = () => {}

// 处理单击汇查看处方
const handleHuiBao = async (row) => {
  console.log(row.id)
  if (role === 'admin') {
    const res = await getChuFangByIdForAdm({ pid: row.id })
    if (res) {
      console.log(res)
    }
  } else if (role === 'staff') {
    const res = await getChuFangByIdForDoc({ pid: row.id })
  }
}

if (role === 'admin') {
  addDoctor()
}
getList()
getAcionList()
</script>

<style lang="scss" scoped>
.patient-name-contianer {
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
