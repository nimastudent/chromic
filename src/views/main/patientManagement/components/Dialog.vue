<template>
  <el-dialog :model-value="dialogVisible" :title="title" @close="handleClose">
    <!-- 原表单页面 -->
    <el-form :model="form" ref="vForm" :rules="rules" label-position="left" size="small" @submit.prevent>
      <!-- 第一行（姓名、电话） -->
      <el-row :gutter="20" type="flex" justify="space-around">
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 10px">
              <div class="font">姓名</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div :model="form" :rules="reles" class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item prop="name">
              <el-input type="text" clearable v-model="form.name" maxlength="5" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 10px">
              <div class="font">电话</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item label="" prop="telephone" class="required">
              <el-input v-model="form.telephone" type="text" clearable maxlength="11" placeholder="请输入电话"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <!-- 第二行（性别、出生日期） -->
      <el-row :gutter="20" type="flex" justify="space-around">
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 30px">
              <div class="font">性别</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item label="" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value" :disabled="item.disabled" style="
                     {
                      display: inline;
                    }
                  ">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 30px">
              <div class="font">出生日期</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item label="" prop="birthday">
              <el-date-picker v-model="form.birthday" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled-date="pickerOptions" clearable style="width: 100%" placeholder="请选择出生日期"></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <!-- 第三行（身高、体重） -->
      <el-row :gutter="20" type="flex" justify="space-around">
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 31px">
              <div class="font">身高</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item label="" prop="height">
              <el-input v-model="form.height" type="text" clearable maxlength="3" placeholder="请输入身高(cm)"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 31px">
              <div class="font">体重</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item label="" prop="weight">
              <el-input v-model="form.weight" type="text" clearable maxlength="3" placeholder="请输入体重(kg)"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <!-- 第四行（机构、医生） -->
      <el-row :gutter="20" type="flex" justify="space-around">
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 30px">
              <div class="font">机构</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item label="" prop="oid" class="required">
              <el-select v-model="form.oid" class="full-width-input" clearable>
                <el-option v-for="(item, index) in orgList" :key="index" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" v-if="role === 'admin'">
              <div class="font">医生</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell">
            <el-select v-if="role === 'admin'" v-model="form.did" class="full-width-input" clearable>
              <el-option v-for="(item, index) in docList" :key="index" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <!-- 第五行（会员开始日期、会员结束日期） -->
      <el-row :gutter="20" type="flex" justify="space-around">
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 30px">
              <div class="font">会员开始日期</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item label="" prop="startDate">
              <el-date-picker v-model="form.startDate" type="date" class="full-width-input" format="YYYY/MM/DD" value-format="YYYY-MM-DD" clearable style="width: 100%" placeholder="请选择会员开始日期"></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="table-cell">
            <div class="static-content-item" style="padding-left: 32px; padding-right: 30px">
              <div class="font">会员结束日期</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-cell" style="padding-left: 10px; padding-right: 40px">
            <el-form-item label="" prop="endDate">
              <el-date-picker v-model="form.endDate" type="date" class="full-width-input" format="YYYY/MM/DD" value-format="YYYY-MM-DD" clearable style="width: 100%" placeholder="请选择会员结束日期"></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleReset('edit')">清空表单</el-button>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, reactive, ref, defineEmits, computed, watch } from 'vue'
import {
  addPaientByStaff,
  addPaientByAdmin,
  updatePaientFofAdmin,
  updatePaientFofStaff
} from '@/api/patientManagement/index'
import { nextTick } from 'vue'
import { ElMessage } from 'element-plus'

const prop = defineProps({
  dialogVisible: Boolean,
  role: String,
  docList: Array,
  orgList: Array,
  dialogStatus: String
})
const emits = defineEmits(['update:dialogVisible', 'updateList'])

const role = prop.role

// 性别选项
const sexOptions = ref([
  {
    label: '男',
    value: '男'
  },
  {
    label: '女',
    value: '女'
  }
])

// dialog title
const title = ref('')

// 表单ref
const vForm = ref(null)

// 表单
const form = reactive({
  name: '',
  telephone: '',
  sex: '',
  height: '',
  weight: '',
  birthday: '',
  oid: '',
  startDate: '',
  endDate: ''
})

// 表单规则
const rules = ref({
  name: [
    {
      required: true,
      message: '姓名不可为空'
    },
    {
      pattern: /^[一-龥]+$/,
      trigger: ['blur', 'change'],
      message: ''
    }
  ],
  telephone: [
    {
      required: true,
      message: '电话不可为空'
    },
    {
      pattern: /^[1][3-9][0-9]{9}$/,
      trigger: ['blur', 'change'],
      message: '请输入正确的手机号码'
    }
  ],
  oid: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ],
  height: [
    { required: true, message: '身高不可为空' },
    {
      pattern: /^(0{1}|[1-9]\d{0,3}|.{0})$/,
      trigger: ['blur', 'change'],
      message: '请输入正确的身高'
    }
  ],
  weight: [
    { required: true, message: '体重不可为空' },
    {
      pattern: /^(0{1}|[1-9]\d{0,3}|.{0})$/,
      trigger: ['blur', 'change'],
      message: '请输入正确的体重'
    }
  ],
  did: [{ required: true, message: '字段值不可为空' }]
})

// 监听status
watch(
  () => prop.dialogStatus,
  (newVal, oldVal) => {
    if (newVal === 'add') {
      handleReset('add')
      title.value = '新增患者'
    } else {
      title.value = '编辑患者'
    }
  }
)

// 设置生日不能选今天以后
const pickerOptions = (time) => {
  return time.getTime() > Date.now()
}

// 处理关闭
const handleClose = () => {
  emits('update:dialogVisible', false)
}

// 处理清空表单
const handleReset = (val) => {
  if (val === 'add') {
    for (let i in form) {
      delete form[i]
    }
  } else {
    for (let i in form) {
      if (i != 'id') {
        delete form[i]
      }
    }
  }
  console.log(form)
}

//提交前处理数据
const beforeConfirm = () => {
  let data = JSON.parse(JSON.stringify(form))
  data.height = parseInt(data.height)
  data.weight = parseInt(data.weight)

  console.log(data)
  return data
}

// 处理提交
const handleConfirm = async () => {
  vForm.value.validate((valid) => {
    if (!valid) return
    const data = beforeConfirm()
    if (prop.dialogStatus === 'add') {
      addSubmit(data)
    } else {
      editSubmit(data)
    }
  })
}

// 新增提交
const addSubmit = async (data) => {
  if (role === 'staff') {
    await addPaientByStaff(data)
    resSuccess()
  } else {
    await addPaientByAdmin(data)
    resSuccess()
  }
}

// 编辑提交
const editSubmit = async (data) => {
  if (role === 'staff') {
    await updatePaientFofStaff(data)
    resSuccess()
  } else {
    await updatePaientFofAdmin(data)
    resSuccess()
  }
}

// 响应成功
const resSuccess = () => {
  if (prop.dialogStatus === 'add') {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
  }
  handleReset()
  emits('updateList')
  handleClose()
}

// 单击编辑后的设置表单
const setData = (data) => {
  for (let item in data) {
    form[item] = data[item]
  }
  let orgList = JSON.parse(JSON.stringify(prop.orgList))
  for (let i = 0; i < orgList.length; i++) {
    if (data.organization === orgList[i].name) {
      nextTick(() => {
        form['oid'] = orgList[i].id
        delete form['organization']
      })
      break
    }
  }
}

defineExpose({
  setData
})
</script>

<style lang="scss">
.el-input-number.full-width-input,
.el-cascader.full-width-input {
  width: 100% !important;
}

.el-form-item--medium {
  .el-radio {
    line-height: 36px !important;
  }

  .el-rate {
    margin-top: 8px;
  }
}

.el-form-item--small {
  .el-radio {
    line-height: 32px !important;
  }

  .el-rate {
    margin-top: 6px;
  }
}

.el-form-item--mini {
  .el-radio {
    line-height: 28px !important;
  }

  .el-rate {
    margin-top: 4px;
  }
}

.clear-fix:before,
.clear-fix:after {
  display: table;
  content: '';
}

.clear-fix:after {
  clear: both;
}

.float-right {
  float: right;
}
</style>

<style lang="scss" scoped>
div.table-container {
  table.table-layout {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    td.table-cell {
      display: table-cell;
      height: 36px;
      border: 1px solid #e1e2e3;
    }
  }
}

div.tab-container {
}

.label-left-align :deep(.el-form-item__label) {
  text-align: left;
}

.label-center-align :deep(.el-form-item__label) {
  text-align: center;
}

.label-right-align :deep(.el-form-item__label) {
  text-align: right;
}

.custom-label {
}

.static-content-item {
  min-height: 20px;
  display: flex;
  align-items: center;

  .font {
    font-size: 18px;
  }
  :deep(.el-divider--horizontal) {
    margin: 0;
  }
}
</style>
