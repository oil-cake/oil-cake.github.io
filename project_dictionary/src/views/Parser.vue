<template>
  <div class="container">
    <div class="title">
      {{ query.title }}
    </div>
    <div class="introduction">
      {{ query.introduction }}
    </div>
    <div style="padding: 3px; flex: 1">
      <div
        style="
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <iframe
          v-if="srcLink"
          @load="onVideoReady"
          :src="srcLink"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
          style="position: absolute; width: 100%; height: 100%"
        ></iframe>
        <div
          v-show="spinning"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(200, 200, 200, 0.5);
          "
        >
          <a-spin size="large" tip="加载中" :spinning="spinning"> </a-spin>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { useRoute } from "vue-router";

const route: unknown = useRoute();
interface FormState {
  title: string;
  introduction: string;
  videoLink: string;
  parserLink?: string;
}
const { query } = toRefs<{ query: FormState }>(
  route as unknown as { query: FormState }
);

const spinning = ref(true);

const srcLink = ref("");
srcLink.value = query.value.videoLink
  ? `https://player.bilibili.com/player.html?isOutside=true&bvid=${query.value.videoLink}&p=1`
  : "";
function onVideoReady(): void {
  spinning.value = false;
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column; /* 确保子元素垂直排列 */
}
.title {
  color: rgb(24, 25, 28);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}
.introduction {
  color: rgb(24, 25, 28);
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
}
</style>
