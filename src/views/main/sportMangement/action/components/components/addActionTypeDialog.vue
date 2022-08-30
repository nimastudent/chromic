<template>
  <el-dialog :model-value="addActionTypeDialog" title="添加动作类型" width="30%" @close="handleClose">

    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="动作类型" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>




<script setup>
import { ElMessage } from 'element-plus'
import { defineEmits, ref, watch } from 'vue';
import { insertActionType } from '@/api/sportManagement/action.js'

const props = defineProps({
  dialogVisible: Boolean,
  titleValue: {
    type: Object,
    default: () => { }
  }
})

const formRef = ref(null)

const form = ref({
  name: ''
})


watch(
  () => props.titleValue,
  () => {
    console.log(props.titleValue)
    form.value = props.titleValue   // 这里的form要在watch上面
  }, { deep: true, immediate: true })

const emits = defineEmits(['update:modelValue', 'initList'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  // 统一校验
  formRef.value.validate(async (valid) => {
    if (valid) {
      await insertActionType(form.value)
      ElMessage({
        showClose: true,
        message: '添加成功！',
        type: 'success'
      })
      emits('initList')
      handleClose()
    } else {
      // console.log('error submit!!');
      ElMessage({
        message: '提交请勿为空！',
        type: 'warning',
      })
      return false;
    }
  });
}


const rules = ref({
  name: [
    {
      required: true,
      message: '请输入动作类型',
      trigger: 'blur',
    }
  ]
})

</script>


<style scoped>
</style>