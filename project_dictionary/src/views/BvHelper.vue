<template>
  <div class="title">
    bv号是一串代号，与B站的一个视频唯一关联。
    <img :src="Bvhelper" alt="出错" />
  </div>
</template>

<script lang="ts" setup>
import Bvhelper from "@/assets/bvHelp.png";
</script>

<style scoped>
.title {
  color: rgb(24, 25, 28);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}
</style>
