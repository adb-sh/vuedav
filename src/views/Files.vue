<template>
  <div class="row mx-1 justify-content-center">
    <div class="d-none d-lg-block col-3">
      <SideMenu />
    </div>
    <FileList
      class="col"
      :path="$route.hash.slice(1)"
      @newPath="(path) => $router.push(`#${path}`)"
    />
  </div>
</template>

<script setup lang="ts">
import FileList from '@/components/files/FileList.vue';
import SideMenu from '@/components/SideMenu.vue';
import { useWebdavStore } from '@/store/webdav';

const store = useWebdavStore();
</script>
