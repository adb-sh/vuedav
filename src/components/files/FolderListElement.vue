<template>
  <tr @click="$router.push(`#${file.filename}`)" class="file">
    <td><i class="icon bi-folder"></i></td>
    <td>{{ file.basename }}</td>
    <td class="d-none d-md-table-cell">{{ new Date(file.lastmod).toLocaleDateString() }}</td>
    <td class="d-none d-sm-table-cell"></td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  file: Object,
});
</script>

<style lang="scss">
.file {
  color: inherit !important;
  text-decoration: inherit !important;
  cursor: pointer;
  &:hover{
    color: inherit !important;
  }
}
</style>
