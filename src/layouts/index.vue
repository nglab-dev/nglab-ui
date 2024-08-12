<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'
</script>

<template>
  <el-container class="h-full w-full">
    <el-aside>
      <div class="h-full w-full flex flex-col">
        <div class="fcc box-border h-55px">
          <img class="w-28px object-contain" src="@/assets/images/logo.svg" alt="logo">
          <span class="ml-6px ws-nowrap text-20px font-bold">Nglab</span>
        </div>

        <el-scrollbar>
          <el-menu
            default-active="2"
            class="w-full border-r-none"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">
                  item one
                </el-menu-item>
                <el-menu-item index="1-2">
                  item two
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">
                  item three
                </el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>
                  item four
                </template>
                <el-menu-item index="1-4-1">
                  item one
                </el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <el-icon><document /></el-icon>
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <span>Navigator Four</span>
            </el-menu-item>
          </el-menu>
          xxx
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
