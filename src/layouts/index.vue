<script setup lang="ts">
const isCollapse = computed(() => false)
const title = 'NGLab UI'
</script>

<template>
  <el-container>
    <el-aside>
      <div class="aside-wrapper" :style="{ width: isCollapse ? '65px' : '220px' }">
        <!-- logo -->
        <div class="logo">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo">
          <span v-show="!isCollapse" class="logo-title">{{ title }}</span>
        </div>
      </div>
    </el-aside>

    <el-container>
      <el-header>
        header
        <!-- <ToolBarLeft />
        <ToolBarRight /> -->
      </el-header>
      <!-- <Main /> -->
      main
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  :deep(.el-aside) {
    width: auto;
    border-right: 1px solid var(--el-border-color);

    .aside-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: width 0.3s ease;

      .logo {
        box-sizing: border-box;
        height: var(--header-height);
        border-bottom: 1px solid var(--el-border-color);
        display: flex;
        align-items: center;
        justify-content: center;

        .logo-img {
          width: 28px;
          object-fit: contain;
        }

        .logo-title {
          margin-left: 6px;
          font-size: 21.5px;
          font-weight: bold;
          white-space: nowrap;
        }
      }

      .el-scrollbar {
        height: calc(100% - var(--header-height));
        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }
    }
  }
}

.el-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 15px;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
}
</style>
