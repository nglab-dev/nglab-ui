<script lang="ts" setup>
const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <el-footer class="footer">
    Copyright ©2022 {{ appName }}
  </el-footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: var(--color-text-2);
  text-align: center;
}
</style>
