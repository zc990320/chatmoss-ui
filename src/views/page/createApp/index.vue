<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { FormInst } from 'naive-ui'
import { NSelect, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import Page from '@/components/page/index.vue'
import { useBack } from '@/utils/router'
import { getApplicationCreate, getApplicationIconList, getApplicationQueryById, getApplicationTypeList, getApplicationUpdate } from '@/api/application'
const router = useRouter()
const back = useBack()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const title = ref('')
const formValue = ref({
  iconUrl: '',
  share: 1,
  contextEnabled: 1,
  guideMsg: '',
})
const rules = {
  iconId: {
    required: true,
    message: '输入选择图标',
  },
  appName: {
    required: true,
    message: '输入应用名称',
  },
  desc: {
    required: true,
    message: '输入应用描述',
  },
  promot: {
    required: true,
    message: '输入指令',
  },
  appType: {
    required: true,
    message: '请选择应用类型',
  },
}
const showBottom = ref(false)
const iconList = ref([])
const typeList = ref([])
function handleValidateButtonClick() {
  if (formValue.value.id)
    getApplicationUpdateAPI()

  else
    getApplicationCreateAPI()
}

getApplicationListAPI()
getApplicationTypeListAPI()
async function getApplicationTypeListAPI() {
  const res = await getApplicationTypeList()
  typeList.value = (res.list || []).map((row) => {
    return {
      label: row.typeName,
      value: row.id,
    }
  })
}
async function getApplicationListAPI() {
  const res = await getApplicationIconList()
  // console.log(iconList, res)
  formValue.value.iconUrl = res.rows[0] ? res.rows[0].url : ''
  formValue.value.iconId = res.rows[0] ? res.rows[0].id : ''
  iconList.value = res.rows || []
}

async function getApplicationCreateAPI() {
  const res = await getApplicationCreate(formValue.value)
  back()
  message.success(res.msg)
}
async function getApplicationUpdateAPI() {
  const res = await getApplicationUpdate(formValue.value)
  back()
  message.success(res.msg)
}
function handleImage(row) {
  formValue.value.iconUrl = row.url
  formValue.value.iconId = row.id
  showBottom.value = false
}
onMounted(async () => {
  if (router.currentRoute.value.query) {
    const id = router.currentRoute.value.query.id
    if (id) {
      title.value = '编辑应用'
      const res = await getApplicationQueryById(id)
      const data = res.data || {}
      formValue.value = {
        id: data.id,
        iconId: data.iconId,
        iconUrl: data.icon,
        appName: data.appName,
        appType: data.appType,
        desc: data.desc,
        promot: data.promot,
        share: data.share,
        contextEnabled: data.contextEnabled,
      }
    }
    else {
      title.value = '新建应用'
    }
  }
})
</script>

<template>
  <Page>
    <template #title>
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="back" />
    </template>

    <div vertical class="main-bg">
      <div class="box">
        <div class="flex justify-between items-center">
          <div>请挑选一个应用的图标</div>
          <div>
            <van-image
              round width="3rem" height="3rem" :src="formValue.iconUrl" class="m-auto"
              @click="() => { showBottom = true }"
            />
          </div>
        </div>
        <van-divider />
        <div class=" flex justify-between items-center">
          <div>应用名称</div>
          <div class="flex-1" style="margin-left: 20px;">
            <input v-model="formValue.appName" class="input" placeholder="例如：智能翻译助手(限12字)">
          </div>
        </div>
        <van-divider />
        <div class="">
          <div>应用描述</div>
          <div class="flex-1">
            <textarea v-model="formValue.desc" class="textarea" type="textarea" placeholder="例如：智能翻译助手(限12字)" />
          </div>
        </div>
        <van-divider />
        <div class="">
          <div>指令</div>
          <div class="flex-1">
            <textarea v-model="formValue.promot" class="textarea" type="textarea" placeholder="例如：智能翻译助手智能翻译助手" />
          </div>
        </div>
        <van-divider />
        <div class="">
          <div>引导语(非必填)</div>
          <div class="flex-1">
            <textarea v-model="formValue.guideMsg" class="textarea" type="textarea" placeholder="例如：请输入你想翻译的语言" />
          </div>
        </div>
        <van-divider />
        <div class="flex justify-between items-center">
          <div>应用类型</div>
          <div class="">
            <NSelect v-model:value="formValue.appType" placeholder="应用类型" :options="typeList" style="width: 100px;" />
          </div>
        </div>
      </div>
      <!-- <div class="box mt-4">
        <div class=" flex justify-between items-center">
          <div>发布商店</div>
          <div class="">
            <NSwitch v-model:value="formValue.share" :checked-value="1" :unchecked-value="0" />
          </div>
        </div>
        <van-divider />
        <div class="flex justify-between items-center">
          <div>开启上下文</div>
          <div class="">
            <NSwitch v-model:value="formValue.contextEnabled" :checked-value="1" :unchecked-value="0" />
          </div>
        </div>

      </div> -->
      <div class="save" @click="handleValidateButtonClick">
        保存
      </div>
    </div>

    <!-- 底部弹出 -->
    <van-action-sheet v-model:show="showBottom" title="选择图标">
      <div class="content">
        <div class="list">
          <div v-for="(item, i) of iconList" :key="i" class="item">
            <img :src="item.url" alt="" @click="handleImage(item)">
          </div>
        </div>
      </div>
    </van-action-sheet>
  </Page>
</template>

<style scoped lang="less">
.save {
  text-align: center;
  width: 80%;
  height: 37px;
  margin: 0 auto;
  margin-top: 25px;
  background-color: #45485C;
  border-radius: 37px;
  line-height: 37px;
  color: #FFFFFF;
}

.textarea {
  width: 100%;
  margin-top: 10px;
  padding: 5px 10px;
  height: 100px;
  background-color: var(--moss-bg-reply-color);
  border-radius: 8px;
}

.input {
  text-align: left;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--moss-bg-reply-color);
  width: 100%;
}

.content {
  height: 40vh;
}

.list {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 20%;
    box-sizing: border-box;
    padding: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.create-store-main {
  padding: 0 15px;
  padding-top: 20px;
  padding-bottom: 60px;
}
</style>
