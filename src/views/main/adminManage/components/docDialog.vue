<template>
  <!-- <el-dialog
    :model-value="docDialogVisiable"
    :title="title"
    @close="handleClose"
  >
  </el-dialog> -->

  <!-- 
title：弹窗的标题
:visible.sync="dialogVisible"：dialogVisible 这个局部变量控制着弹窗的显示隐藏（ true 为显示，false 为隐藏）
:before-close="handleClose"：关闭前的回调，会暂停 Dialog 的关闭
slot="footer"：弹窗分为两部分（ body 和 footer ），这里为 footer
@click="dialogVisible = false"：确定和取消按钮都将关闭弹窗 -->
  <el-dialog
    :model-value="docDialogVisiable"
    :title="title"
    width="30%"
    @close="handleClose"
    :before-close="handleClose"
  >
    <!--  @click：点击触发的事件
        dialogVisible = true：dialogVisible 这个局部变量控制着弹窗的显示隐藏（ true 为显示，false 为隐藏） -->

    <!-- 弹窗表单内容 -->
    <!--                定义数据源 -->
    <!--                                                          表单校验 -->
    <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
      <!-- prop 属性              校验规则和数据匹配 -->
      <!-- 父组件可以使用 props 把数据传给子组件。 -->
      <el-form-item label="医生姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="机构" prop="oid">
        <!-- 因为 机构 是后台传给前端的  不能让用户手动输入  所以用下拉框 -->
        <el-select v-model="form.oid">
          <!-- label是下拉框 显示的  value是 v-model 传递的值 -->
          <el-option
            v-for="(item, index) in orgList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- // title	Dialog 对话框 Dialog 的标题， 也可通过具名 slot （见下表）传入	string	—	—
    // model-value / v-model	是否显示 Dialog	boolean	—	—
    // close   	Dialog 关闭的回调
    // 这是个 dialog 组件   -->
</template>

<script setup>
import { defineProps, ref, watch, defineEmits, reactive } from 'vue' //定义值导入ref
import { addDoc, updateDoc } from '@/api/systemManage/adminManage'
import { ElMessage } from 'element-plus'

// props vue 组件传参  父组件向子组件传这个参数
//defineProps   获取组件出传值
const props = defineProps({
  dialogStatus: String,
  docDialogVisiable: Boolean,
  orgList: Array,
  dialogTableValue: Object
})

// 这个title 绑定对话框的 标题
const title = ref('')

const formRef = ref(null)

//定义form表单里的值
const form = reactive({})

// watch  监听 不懂 看文档去
watch(
  () => props.dialogStatus,
  (newVal, oldeVal) => {
    console.log(props.dialogTableValue)
    if (newVal === 'add') {
      title.value = '新增医生'
    } else {
      title.value = '编辑医生'
    }
  }
)

//监听 这个数据的变化
watch(
  () => props.dialogTableValue,
  (newVal, oldVal) => {
    console.log(newVal)

    console.log(form)

    for (const key in newVal) {
      // 那个函数看不懂 就百度  那个比我专业
      // 这个 机构 不显示 是因为  传的 是机构a  但是绑定的值应该是 1 从那个机构列表里的查找可以找到  这个 问题不大  先不改了

      if (Object.hasOwnProperty.call(newVal, key)) {
        form[key] = newVal[key]
      }
    }
    // 这个 form 没有值 是因为 赋值没赋好
    console.log(form)
  }
)

// 事件  子组件向父组件 发送事件 修改在父组件里的 docDialogVisiable  从而实现 单击 添加可以打开对话框
//defineEmits   子组件向父组件事件传递
// const emits = defineEmits(['update:docDialogVisiable'])

// const handleClose = () => {
//   emits('update:docDialogVisiable', false)
// }

const emits = defineEmits(['update:docDialogVisiable', 'getList'])

const handleClose = () => {
  emits('update:docDialogVisiable', false)
}

//确认按钮
const handleConfirm = () => {
  // 确认校验  async 和 await  确保父级关系 才能异步 获取到数据
  formRef.value.validate((valid) => {
    if (valid) {
      if (props.dialogStatus === 'add') {
        createSubmit()
      } else {
        editSubmit()
      }
    } else {
      return
    }
  })
  //调用关闭窗口
}

const createSubmit = async () => {
  const res = await addDoc(form)
  // 事实上你用 .then((res) => {}) 一样能获取到
  if (res.success) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
    handleClose()
    // 添加成功后 关闭 对话框 并且 更新 信息  @getList 什么意思 自己去看vue文档
    emits('getList')
  }
}

// updateDoc
const editSubmit = async () => {
  console.log(form.value)
  const res = await updateDoc(form)
  // 事实上你用 .then((res) => {}) 一样能获取到
  if (res.success) {
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    handleClose()
    // 添加成功后 关闭 对话框 并且 更新 信息  @getList 什么意思 自己去看vue文档
    emits('getList')
  }
}

//定义表单校验rules
//对象 -> key值 -> 数组
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
      //表单验证触发方式
      //trigger: ‘change’:数据改变时触发
      //trigger: ‘blur’:失去焦点时触发
    }
  ],
  account: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ],
  oid: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ]
})
</script>
