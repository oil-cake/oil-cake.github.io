<template>
  <div class="container">
    <div class="container-item">
      <h1 style="text-align: center"><QrcodeOutlined />二维码生成器</h1>
    </div>
    <div class="container-item">
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        :disabled="componentDisabled"
        name="qrLink"
        style="max-width: 100%"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        :model="formState"
      >
        <a-form-item
          label="标题"
          name="title"
          :rules="[
            {
              required: true,
              message: 'Please input title!',
              trigger: 'change',
            },
          ]"
        >
          <a-input v-model:value="formState.title">
            <template #prefix>
              <FormOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          label="简介"
          name="introduction"
          :rules="[{ required: false }]"
        >
          <a-textarea v-model:value="formState.introduction"> </a-textarea>
        </a-form-item>
        <a-form-item
          label="B站bv号"
          name="videoLink"
          :rules="[
            {
              required: true,
              message: 'Please input video link!',
              trigger: 'change',
            },
          ]"
        >
          <div style="display: flex; flex-direction: row">
            <a-input v-model:value="formState.videoLink">
              <template #prefix>
                <LinkOutlined class="site-form-item-icon" />
              </template>
            </a-input>
            <div class="bv-question" title="帮助" @click="routeToBvHelper">
              <QuestionCircleOutlined />
            </div>
          </div>
        </a-form-item>

        <a-form-item
          label="解析地址"
          name="parserLink"
          :rules="[
            {
              required: true,
              message: 'Please input parser link!',
            },
          ]"
        >
          <a-input v-model:value="formState.parserLink">
            <template #prefix>
              <LinkOutlined class="site-form-item-icon" />
            </template>
          </a-input>
          <a-button @click="getLocalHost"> 获取当前地址 </a-button>
        </a-form-item>
        <a-form-item label="操作">
          <a-button type="primary" html-type="submit">生成二维码</a-button>
        </a-form-item>
        <a-form-item label="logo" v-if="qrInfo.content !== ''">
          <a-switch v-model:checked="logoContentChecked" />
        </a-form-item>
        <a-form-item label="二维码" v-if="qrInfo.content !== ''">
          <a-qrcode
            :value="qrInfo.content"
            :size="250"
            error-level="H"
            :icon="logoContent"
          />
          <br />
          刷新时间：{{ qrInfo.timestamp }}
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import logo from "@/assets/kunkun.png";
import { useRouter } from "vue-router";

import {
  QrcodeOutlined,
  LinkOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";
import { format } from "date-fns";

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };
const componentDisabled = ref(false);
interface FormState {
  title: string;
  introduction: string;
  videoLink: string;
  parserLink?: string;
}
const formState = reactive<FormState>({
  title: "",
  introduction: "",
  videoLink: "",
  parserLink: "",
});
const qrInfo = reactive({
  content: "",
  timestamp: "",
});

function generateQrCode(): void {
  qrInfo.timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  const info = { ...formState };
  info.parserLink = "";
  delete info.parserLink;
  const params = new URLSearchParams(Object.entries(info));
  qrInfo.content = formState.parserLink + "?" + params.toString();
  console.log(qrInfo.content);
}

const onFinish = () => {
  generateQrCode();
};

const onFinishFailed = () => {
  qrInfo.content = "";
  qrInfo.timestamp = "";
};

const logoContentChecked = ref(true);
const logoContent = ref<string | null>(logo);

watch(
  logoContentChecked,
  (newVal) => {
    logoContent.value = newVal ? logo : null;
  },
  { immediate: true }
);

function getLocalHost(): void {
  formState.parserLink = window.location.origin;
}

function routeToBvHelper(): void {
  const router = useRouter();
  router.push({ name: "BvHelper" });
}
</script>
<style scoped>
.container {
  display: flexbox; /* 使用Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%;
}
.container-item {
  align-items: center; /* 垂直居中 */
}
.bv-question {
  display: flex; /* 使用Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding-left: 2px;
}
.bv-question:hover {
  color: rgb(22, 119, 255);
}
</style>
