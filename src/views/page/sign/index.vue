<script lang="ts" setup>
import { ref } from 'vue'
import Page from '@/components/page/index.vue'
import { useBack } from '@/utils/router'
import { getToken } from '@/store/modules/auth/helper'
const back = useBack()
import {  replaceDom } from '@/utils/jumpLink'

let dom = 'http://h5.aihao123.cn/pages/app/signIn-new/index.html'

dom = replaceDom(dom)

const url = ref(`${dom}?token=${getToken()}&time=${new Date().getTime()}`)
</script>

<template>
  <Page>
    <template #title>
      <van-nav-bar title="" left-text="返回" left-arrow @click-left="back" />
    </template>
    <iframe :src="url" frameborder="0" style="width:100%;height:100%;" />
  </Page>
</template>
