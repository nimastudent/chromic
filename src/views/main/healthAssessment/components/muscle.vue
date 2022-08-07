<template>
  <el-form
    :model="formData"
    ref="vForm"
    :rules="rules"
    label-position="left"
    label-width="130px"
    size="medium"
    @submit.prevent
  >
    <el-row>
      <el-col :span="11" class="grid-cell">
        <el-form-item label="握力（左）" prop="left">
          <el-input v-model="formData.left" type="number" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :push="1" class="grid-cell">
        <el-form-item label="握力（右）" prop="right">
          <el-input v-model="formData.right" type="number" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" class="grid-cell">
        <el-form-item label="30s坐站（中老年）" prop="sitStand">
          <el-input
            v-model="formData.sitStand"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1" class="grid-cell">
        <el-form-item label="4.5m步行（中老年）" prop="walk">
          <el-input v-model="formData.walk" type="number" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" class="grid-cell">
        <el-form-item label="俯卧撑（男）" prop="pushUp">
          <el-input
            v-model="formData.pushUp"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1" class="grid-cell">
        <el-form-item label="肌力汇总" prop="number">
          <el-upload
            ref="uploadRef"
            name="all"
            :action="uploadUrl"
            :data="formData"
            list-type="picture-card"
            show-file-list
            :limit="1"
            :auto-upload="false"
            :with-credentials="true"
            :on-success="handleSuccess"
          >
            <template #default><i class="el-icon-plus"></i></template
          ></el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-button size="large" type="primary" @click="submitForm">提交</el-button>
  </el-form>
</template>
<script setup>
import {
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  computed,
  ref
} from 'vue'
import { ElMessage } from 'element-plus'
import { getURl } from '@/api/request'

const props = defineProps({
  pid: Number,
  activeUrl: String
})

const uploadUrl = computed(() => {
  const baseUrl = getURl()
  return `${baseUrl}/${props.activeUrl}/insert`
})

const formData = reactive({
  left: '',
  right: '',
  sitStand: '',
  walk: '',
  pushUp: ''
})

const rules = ref({
  pushUp: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ],
  left: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ],
  right: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ],
  sitStand: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ],
  walk: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ]
})
const state = reactive({
  allFileList: [],
  allUploadHeaders: {},
  allUploadData: {}
})

const instance = getCurrentInstance()
const uploadRef = ref()
const submitForm = () => {
  instance.ctx.$refs['vForm'].validate((valid) => {
    if (!valid) return
    formData.pid = 1
    uploadRef.value.submit()
    //TODO: 提交表单
  })
}
const resetForm = () => {
  instance.ctx.$refs['vForm'].resetFields()
}

const handleSuccess = (res, uploadFile, uploadFiles) => {
  if (res) {
    ElMessage({
      type: 'success',
      message: '新增成功!'
    })
  }
}
</script>
<style lang="scss" scoped></style>
