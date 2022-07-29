<template>
  <tr>
    <td><i class="icon col-1" :class="`bi-${getIconFromFile(file)}`"></i></td>
    <td>{{ file.basename }}</td>
    <td class="d-none d-md-table-cell">
      {{ new Date(file.lastmod).toLocaleDateString() }}
    </td>
    <td class="d-none d-sm-table-cell"><ByteCalc :bytes="file.size" /></td>
  </tr>
</template>

<script setup lang="ts">
import ByteCalc from '@/components/helpers/ByteCalc.vue';
import { defineProps } from 'vue';
import { fileExtensions, defaultIcon } from '@/lib/fileTypeToIconMappings';
import type { File } from '@/models';

const props = defineProps({
  file: Object,
  client: Object,
});

const getIconFromFile = (file: File): string => {
  const segments = file.basename.split('.');
  if (segments.length < 2) return defaultIcon;
  return fileExtensions.get(segments.pop() as string) ?? defaultIcon;
};

const downloadFile = async (file: File) => {
  await props.client?.getFileContents(file.filename);
};
</script>
