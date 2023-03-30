<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row style="margin: 5px 0">
      <el-button type="primary" @click="handleRuleClick"
        >会员套餐管理</el-button
      >
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
        v-for="(item, index) in options"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'action'">
          <el-col :span="8">
            <el-button type="danger" @click="handleDelete(row.id)"
              >删除</el-button
            >
          </el-col>
        </template>
      </el-table-column>
    </el-table>
    <rule-dialog v-model:dialogVisible="ruleDialogVisiable" />
  </el-card>
</template>

<script setup>
import ruleDialog from './components/ruleDialog.vue'
import { reactive, toRefs, ref } from 'vue'
import { getAllRule, getAllBill } from '../../../api/ruleManagement'
import { options } from './optioin'
import { getHeightWithOutHeader } from '@/utils/params/height'

const state = reactive({
  loading: false,
  tableData: []
})

const ruleDialogVisiable = ref(false)

const cardHeight = getHeightWithOutHeader()

//获取数据
const fetchData = async () => {
  state.loading = true
  const res = await getAllBill({ pageNum: 1, pageSize: 10 })
  state.tableData = res.body.content
  state.loading = false
}

//处理单击会员套餐管理
const handleRuleClick = () => {
  ruleDialogVisiable.value = true
}

fetchData()

const { loading, tableData } = toRefs(state)
</script>
